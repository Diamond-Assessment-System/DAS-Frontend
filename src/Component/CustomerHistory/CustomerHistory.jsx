import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CustomerHistory/CustomerHistory.css";

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const CustomerHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
      fetchHistory(account.accountId);
    }
  }, [navigate]);

  const fetchHistory = async (accountId) => {
    try {
      const response = await axios.get('https://das-backend.fly.dev/api/booking-samples');
      const filteredHistory = response.data.filter(sample => sample.accountId === accountId);
      setHistory(filteredHistory);
    } catch (error) {
      console.error("Error fetching the history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (sample) => {
    switch (sample.status) {
      case 1:
        window.alert("Đang chờ nhân viên xác nhận");
        break;
      case 2:
        window.alert("Đang thực hiện giám định");
        break;
      case 3:
        navigate(`/history/${sample.sampleId}`);
        break;
      case 4:
        window.alert("Đã bị hủy, không thể xem");
        break;
      default:
        break;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "status-openedCH";
      case 2:
        return "status-assessingCH";
      case 3:
        return "status-completedCH";
      case 4:
        return "status-canceledCH";
      default:
        return "";
    }
  };

  const getStatusMeaning = (status) => {
    switch (status) {
      case 1:
        return "Đã Mở";
      case 2:
        return "Đang Giám Định";
      case 3:
        return "Đã Hoàn Thành";
      case 4:
        return "Đã Hủy";
      default:
        return "Unknown status";
  }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Lịch sử giám định</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                <th className="py-4 px-4 text-center align-middle">Giá</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {history.map((sample, index) => (
                <tr key={index}>
                  <td className="py-4 px-4 align-middle">{sample.bookingId}</td>
                  <td className="py-4 px-4 align-middle">{sample.name}</td>
                  <td className="py-4 px-4 align-middle">{sample.size}</td>
                  <td className="py-4 px-4 align-middle">
                    {formatPrice(sample.price)} VND
                  </td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}>
                    <h3>{getStatusMeaning(sample.status)}</h3>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDetails(sample)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
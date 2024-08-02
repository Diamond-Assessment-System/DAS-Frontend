import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CustomerHistory/CustomerHistory.css";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import backgroundImage from "../../assets/backgroundcus.png";

const formatPrice = (price) => {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " VND" : "Chưa xác nhận đơn";
};

const CustomerHistoryBooking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
      fetchHistory(id);
    }
  }, [navigate, id]);

  const fetchHistory = async () => {
    try {
      console.log("api: " + `http://localhost:8080/api/booking-samples/booking/${id}`);
      const response = await axios.get(`http://localhost:8080/api/booking-samples/booking/${id}`);
      setHistory(response.data);
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
        navigate(`/history/historyBooking/${sample.sampleId}`);
        break;
      case 4:
        window.alert("Chưa thực hiện giám định");
        break;
      case 5:
        window.alert("Đã bị hủy, không thể xem");
        break;
      default:
        break;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-gray-100 text-gray-800";
      case 5:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`, marginTop: "5rem" }}>
      <div className="mx-auto py-16 px-4">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h4 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Lịch sử giám định</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-center">Mã mẫu</th>
                  <th className="py-4 px-6 text-center">Tên mẫu</th>
                  <th className="py-4 px-6 text-center">Kích cỡ</th>
                  <th className="py-4 px-6 text-center">Giá</th>
                  <th className="py-4 px-6 text-center">Trạng Thái</th>
                  <th className="py-4 px-6 text-center">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {history.map((sample, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-6 text-center">{sample.sampleId}</td>
                    <td className="py-4 px-6 text-center">{sample.name}</td>
                    <td className="py-4 px-6 text-center">{sample.size}</td>
                    <td className="py-4 px-6 text-center">{formatPrice(sample.price)}</td>
                    <td className={`py-4 px-6 text-center ${getStatusClass(sample.status)}`}>
                      {getSampleStatusMeaning(sample.status)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => handleDetails(sample)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistoryBooking;

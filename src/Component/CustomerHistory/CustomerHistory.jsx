import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CustomerHistory/CustomerHistory.css";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";

const formatPrice = (price) => {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " VND" : "Chưa xác nhận đơn";
};

const CustomerHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
      fetchHistory(account.accountId);
    }
  }, [navigate]);

  const fetchHistory = async (accountId) => {
    try {
      const response = await axios.get('https://das-backend.fly.dev/api/assessment-bookings');
      const filteredHistory = response.data.filter(sample => sample.accountId === accountId);
      setHistory(filteredHistory);
    } catch (error) {
      console.error("Error fetching the history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetails = (sample) => {
    navigate(`/history/${sample.bookingId}`);
  };

  const handleOpenPopup = (sample) => {
    setSelectedSample(sample);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedSample(null);
    setFeedback("");
  };

  const handleSaveFeedback = async () => {
    try {
      await axios.put(`https://das-backend.fly.dev/api/assessment-bookings/${selectedSample.bookingId}/feedback`, { feedback });
      handleClosePopup(); // Close the popup
      fetchHistory(loggedAccount.accountId); // Refresh the history to show the feedback status
    } catch (error) {
      console.error("Error saving feedback:", error);
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
        return "status-sealedCH";
      case 5:
        return "status-canceledCH";
      default:
        return "";
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
                <th className="py-4 px-4 text-center align-middle">Ngày đặt đơn</th>
                <th className="py-4 px-4 text-center align-middle">Ngày trả đơn</th>
                <th className="py-4 px-4 text-center align-middle">Số lượng mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Tổng giá trị</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Đánh giá</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {history.map((sample, index) => (
                <tr key={index}>
                  <td className="py-4 px-4 align-middle">{sample.bookingId}</td>
                  <td className="py-4 px-4 align-middle">{sample.dateCreated}</td>
                  <td className="py-4 px-4 align-middle">
                    {sample.sampleReturnDate ? sample.sampleReturnDate : "Chưa xác nhận đơn"}
                  </td>
                  <td className="py-4 px-4 align-middle">{sample.quantities}</td>
                  <td className="py-4 px-4 align-middle">
                    {formatPrice(sample.totalPrice)}
                  </td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}>
                    <h3>{getBookingStatusMeaning(sample.status)}</h3>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      {sample.feedback ? (
                        <span className="successfull-feedback-history">Đã đánh giá</span>
                      ) : (
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={() => handleOpenPopup(sample)}
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
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

      {showPopup && (
        <div className="popup-overlay-history">
          <div className="popup-content-history">
            <span className="close-history" onClick={handleClosePopup}>&times;</span>
            <h3 className="title-feedback-history">Đánh giá dịch vụ</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập đánh giá của bạn"
              rows="5"
              cols="50"
            />
            <button className="save-button-history" onClick={handleSaveFeedback}>Lưu</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHistory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import backgroundImage from "../../assets/backgroundcus.png"; // Update the path as necessary

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
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-purple-100 text-purple-800";
      case 5:
        return "bg-red-100 text-red-800";
      default:
        return "";
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
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="mx-auto py-16 px-4">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h4 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Lịch sử giám định</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-center">Mã đơn hàng</th>
                  <th className="py-4 px-6 text-center">Ngày đặt đơn</th>
                  <th className="py-4 px-6 text-center">Ngày trả đơn</th>
                  <th className="py-4 px-6 text-center">Số lượng mẫu</th>
                  <th className="py-4 px-6 text-center">Tổng giá trị</th>
                  <th className="py-4 px-6 text-center">Trạng Thái</th>
                  <th className="py-4 px-6 text-center">Đánh giá</th>
                  <th className="py-4 px-6 text-center">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {history.map((sample, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-6 text-center">{sample.bookingId}</td>
                    <td className="py-4 px-6 text-center">{sample.dateCreated}</td>
                    <td className="py-4 px-6 text-center">
                      {sample.sampleReturnDate ? sample.sampleReturnDate : "Chưa xác nhận đơn"}
                    </td>
                    <td className="py-4 px-6 text-center">{sample.quantities}</td>
                    <td className="py-4 px-6 text-center">
                      {formatPrice(sample.totalPrice)}
                    </td>
                    <td className={`py-4 px-6 text-center ${getStatusClass(sample.status)}`}>
                      {getBookingStatusMeaning(sample.status)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center">
                        {sample.feedback ? (
                          <span className="bg-green-200 text-green-800 px-2 py-1 rounded">Đã đánh giá</span>
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
                    <td className="py-4 px-6 text-center">
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

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <span className="text-gray-800 text-2xl cursor-pointer float-right" onClick={handleClosePopup}>&times;</span>
            <h3 className="text-xl font-bold mb-4">Đánh giá dịch vụ</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập đánh giá của bạn"
              rows="5"
              className="w-full p-2 border rounded"
            />
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSaveFeedback}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerHistory;

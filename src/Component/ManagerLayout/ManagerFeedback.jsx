import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { handleSession } from "../../utils/sessionUtils";
import backgroundImage from "../../assets/backgroundcus.png"; // Update the path as necessary

const ManagerFeedbackList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
      fetchFeedbackList(account.accountId);
    }
  }, [navigate]);

  const fetchFeedbackList = async (accountId) => {
    try {
      const response = await axios.get('https://das-backend.fly.dev/api/assessment-bookings');
      const feedbacks = response.data.filter(sample => sample.feedback);

      // Extract feedback and phone number
      const feedbackWithPhone = feedbacks.map(sample => ({
        bookingId: sample.bookingId,
        phone: sample.phone,
        feedback: JSON.parse(sample.feedback).feedback // Extract feedback from JSON string
      }));

      setFeedbackList(feedbackWithPhone);
    } catch (error) {
      console.error("Error fetching feedback list:", error);
    } finally {
      setLoading(false);
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
          <h4 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Danh sách phản hồi</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-center">Mã đơn hàng</th>
                  <th className="py-4 px-6 text-center">Số điện thoại</th>
                  <th className="py-4 px-6 text-center">Phản hồi</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {feedbackList.map((sample, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-6 text-center">{sample.bookingId}</td>
                    <td className="py-4 px-6 text-center">{sample.phone}</td>
                    <td className="py-4 px-6 text-center">{sample.feedback}</td>
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

export default ManagerFeedbackList;

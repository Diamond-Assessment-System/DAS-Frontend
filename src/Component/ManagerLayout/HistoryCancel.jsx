import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { handleSession } from "../../utils/sessionUtils";
import { BOOKING_SAMPLES_URL } from "../../utils/apiEndPoints";
import backgroundImage from "../../assets/backgroundcus.png"; // Update the path as necessary

const CanceledSamplesList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [canceledSamples, setCanceledSamples] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [samplesResponse, accountsResponse] = await Promise.all([
        axios.get(BOOKING_SAMPLES_URL),
        axios.get('https://das-backend.fly.dev/api/accounts'),
      ]);

      const samples = samplesResponse.data;
      const accounts = accountsResponse.data;

      // Filter samples with a non-null cancelReason
      const canceledSamplesWithReason = samples.filter(sample => sample.cancelReason);

      setCanceledSamples(canceledSamplesWithReason);
      setAccounts(accounts);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStaffName = (accountId) => {
    const account = accounts.find(acc => acc.accountId === accountId);
    return account ? account.displayName : "Unknown";
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
          <h4 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Danh sách mẫu bị hủy</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-6 text-center">Mã đơn hàng</th>
                  <th className="py-4 px-6 text-center">Tên mẫu</th>
                  <th className="py-4 px-6 text-center">Nhân viên hủy</th>
                  <th className="py-4 px-6 text-center">Lý do hủy</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {canceledSamples.map((sample, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-4 px-6 text-center">{sample.bookingId}</td>
                    <td className="py-4 px-6 text-center">{sample.name}</td>
                    <td className="py-4 px-6 text-center">{getStaffName(sample.accountId)}</td>
                    <td className="py-4 px-6 text-center">{sample.cancelReason}</td>
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

export default CanceledSamplesList;

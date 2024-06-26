import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";

function AsPaperManager() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});
  const [accounts, setAccounts] = useState([]);

  const fetchSamples = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/booking-samples");
      const filteredSamples = response.data.filter(sample => sample.status === 1);
      setSamples(filteredSamples);
    } catch (error) {
      console.error("Error fetching the samples:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts/role/3");
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching the accounts:", error);
    }
  };

  useEffect(() => {
    fetchSamples();
    fetchAccounts();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500';
      case 'Completed':
        return 'text-green-500';
      case 'Cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const handleSelectChange = (e, sampleId) => {
    const selectedAction = e.target.value;
    setSelectedActions(prevState => ({
      ...prevState,
      [sampleId]: selectedAction,
    }));
  };

  const handleSubmit = async (sampleId) => {
    const selectedAction = selectedActions[sampleId];
    if (selectedAction) {
      try {
        await axios.put(`http://localhost:8080/api/booking-samples/${sampleId}/assign/${selectedAction}`);
        fetchSamples();
      } catch (error) {
        console.error("Error assigning the staff:", error);
      }
    }
    if (selectedAction === "viewDetails") {
      navigate(`/assessmentstaff/assessmentbooking/${sampleId}/selection`);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đặt Hẹn</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {samples.map((sample) => (
                <tr key={sample.sampleId}>
                  <td className="py-4 px-4 text-center align-middle">{`#${sample.bookingId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{`${sample.name}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{sample.size}</td>
                  <td className={`py-4 px-4 text-center align-middle ${getStatusClass(sample.status)}`}>
                    {getSampleStatusMeaning(sample.status)}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <select
                        onChange={(e) => handleSelectChange(e, sample.sampleId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        value={selectedActions[sample.sampleId] || ""}
                      >
                        <option value="" disabled hidden>Select action</option>
                        {accounts.map(account => (
                          <option key={account.accountId} value={account.accountId}>
                            {account.displayName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => handleSubmit(sample.sampleId)}
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
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
}

export default AsPaperManager;

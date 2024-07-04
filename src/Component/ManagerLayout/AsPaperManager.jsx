import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Paginate/Pagination"; 
import '../ManagerLayout/AsPaperManager.css'; 
import { BOOKING_SAMPLES_URL, USERS_ROLE_3_URL, getExecuteActionUrl } from "../../utils/apiEndPoints";

function AsPaperManager() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const fetchSamples = async () => {
    try {
      const response = await axios.get(BOOKING_SAMPLES_URL);
      const filteredSamples = response.data.filter(sample => sample.status === 1);
      setSamples(filteredSamples);
    } catch (error) {
      console.error("Error fetching the samples:", error);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(USERS_ROLE_3_URL);
      setAccounts(response.data);
    } catch (error) {
      console.error("Error fetching the accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSamples();
    fetchAccounts();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(samples.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(samples.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, samples]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % samples.length;
    setItemOffset(newOffset);
  };

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
        //await axios.put(`https://das-backend.fly.dev/api/booking-samples/${sampleId}/assign/${selectedAction}`);
        await axios.put(getExecuteActionUrl(sampleId, selectedAction));
        fetchSamples();
      } catch (error) {
        console.error("Error assigning the staff:", error);
      }
    }
    if (selectedAction === "viewDetails") {
      navigate(`/assessmentstaff/assessmentbooking/${sampleId}/selection`);
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

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
              {currentItems.map((sample) => (
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
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
}

export default AsPaperManager;

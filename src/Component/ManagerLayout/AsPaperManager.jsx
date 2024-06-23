import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";

function AsPaperManager() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/booking-samples");
        setSamples(response.data);
      } catch (error) {
        console.error("Error fetching the samples:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

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

  const handleSubmit = (sampleId) => {
    const selectedAction = selectedActions[sampleId];
    if (selectedAction === "viewDetails") {
      navigate(`/assessmentstaff/assessmentbooking/${sampleId}/selection`);
    }
    // Add more actions if needed
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đặt Hẹn</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
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
                        <option value="viewDetails">Xem chi tiết</option>
                        {/* Add more options as needed */}
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

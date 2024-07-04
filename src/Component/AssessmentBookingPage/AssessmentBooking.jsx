import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AssessmentBooking.css";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner"; // Import the Spinner component
import { handleSession } from "../../utils/sessionUtils";
import { BOOKING_SAMPLES_URL } from "../../utils/apiEndPoints";

function AssessmentBooking() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [loggedAccount, setLoggedAccount] = useState([]);


  useEffect(() => {
    const initialize = async () => {
      const loggedAccount = handleSession(navigate);
      if (loggedAccount) {
        setLoggedAccount(loggedAccount);
        try {
          const response = await axios.get(BOOKING_SAMPLES_URL);
          setSamples(response.data);
        } catch (error) {
          console.error("Error fetching the samples:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case 3:
        return "status-completed";
      case 4:
        return "status-canceled";
      case 2:
        return "status-assessing";
      case 1:
        return "status-opened"
      default:
        return "";
    }
  };

  const handleShowDetails = (sample) => {
    switch (sample.status) {
      case 2:
        navigate(`/assessmentstaff/assessmentbooking/${sample.sampleId}/selection`);
        break;
      case 3: //hoan thanh
        navigate(`/consultingstaff/assessmentpaperlist/${sample.sampleId}`)
        break;
      case 4:
        alert("Yêu cầu đã bị hủy!");
        break;
      default:
        alert("Invalid!");
        break;
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
    <div>

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
                    <td className="py-4 px-4 align-middle">{`#${sample.bookingId}`}</td>
                    <td className="py-4 px-4 align-middle">{`${sample.name}`}</td>
                    <td className="py-4 px-4 align-middle">{sample.size}</td>
                    <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}><h3>{getSampleStatusMeaning(sample.status)}</h3></td>
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => handleShowDetails(sample)}
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
    </div>
  );
}

export default AssessmentBooking;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

function AssessmentRequestConsulting() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/assessmentrequests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching the requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-green-500";
      case 3:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getServiceText = (service) => {
    switch (service) {
      case 1:
        return "Giám định kim cương";
      case 2:
        return "Niêm phong kim cương";
      case 3:
        return "Cấp lại giấy giám định";
      default:
        return "Không xác định";
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
                <th className="py-4 px-4 text-left align-middle">Mã yêu cầu</th>
                <th className="py-4 px-4 text-left align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-left align-middle">Số Lượng Kim Cương</th>
                <th className="py-4 px-4 text-left align-middle">Ngày tạo</th>
                <th className="py-4 px-4 text-left align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-left align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requests.map((request) => (
                <tr key={request.requestId}>
                  <td className="py-4 px-4 align-middle">{`#${request.requestId}`}</td>
                  <td className="py-4 px-4 align-middle">{getServiceText(request.serviceId)}</td>
                  <td className="py-4 px-4 align-middle">{request.numberOfSamples}</td>
                  <td className="py-4 px-4 align-middle">{request.dateCreated}</td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(request.status)}`}>{getStatusClass(request.status)}</td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => navigate(`/consultingstaff/assessmentrequest/${request.requestId}`)}
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
}

export default AssessmentRequestConsulting;

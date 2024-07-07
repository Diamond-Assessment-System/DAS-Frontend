import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CustomerHistory/CustomerHistory.css";

const CustomerHistory = () => {
  const navigate = useNavigate();
  const requestData = [
    { orderId: "1", sampleName: "Sample 1", size: 5, status: "Completed", date: "28-6-2024" },
    { orderId: "2", sampleName: "Sample 2", size: 4, status: "Canceled", date: "28-6-2024" },
    { orderId: "3", sampleName: "Sample 3", size: 7, status: "Assessing", date: "28-6-2024" },
    { orderId: "4", sampleName: "Sample 4", size: 3, status: "Assessing", date: "28-6-2024" },
    { orderId: "5", sampleName: "Sample 5", size: 10, status: "Completed", date: "28-6-2024" },
    { orderId: "6", sampleName: "Sample 6", size: 4, status: "Canceled", date: "28-6-2024" },
    { orderId: "7", sampleName: "Sample 7", size: 5, status: "Assessing", date: "28-6-2024" },
    { orderId: "8", sampleName: "Sample 8", size: 2, status: "Assessing", date: "28-6-2024" },
  ];

  const handleDetails = (orderId) => {
    navigate(`/customer-history/${orderId}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "status-completedCH";
      case "Canceled":
        return "status-canceledCH";
      case "Assessing":
        return "status-assessingCH";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Lịch sử giám định</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                <th className="py-4 px-4 text-center align-middle">Ngày yêu cầu</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {requestData.map((sample, index) => (
                <tr key={index}>
                  <td className="py-4 px-4 align-middle">{sample.orderId}</td>
                  <td className="py-4 px-4 align-middle">{sample.sampleName}</td>
                  <td className="py-4 px-4 align-middle">{sample.size}</td>
                  <td className="py-4 px-4 align-middle">{sample.date}</td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}><h3>{sample.status}</h3></td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleDetails(sample.orderId)}
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
};

export default CustomerHistory;

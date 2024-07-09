import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  return (
    <div className="success-page flex items-center justify-center min-h-screen bg-gray-100">
      <div className="success-message bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="checkmark flex items-center justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            viewBox="0 0 52 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="26"
              cy="26"
              r="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ĐẶT HẸN THÀNH CÔNG
        </h1>
        <p className="text-gray-600 mb-6">
          Chúc mừng bạn đã đặt hẹn thành công, thông tin lịch hẹn
        </p>
        <div className="transaction-code bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Mã giao dịch:{" "}
            <span className="text-orange-500">#{state.bookingId}</span>
          </h2>
          <div className="appointment-details text-left text-gray-700">
            <p>Số Điện Thoại: {state.phone}</p>
            <p>Dịch Vụ: {state.serviceName}</p>
            <p>Số Lượng (Viên): {state.quantities}</p>
            <p>Ngày Đặt Hẹn: {state.dateCreated}</p>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          Trang Chủ
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;

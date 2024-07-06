import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  // const getServiceText = (serviceId) => {
  //   switch (serviceId) {
  //     case 1:
  //       return "Giám Định Kim Cương 24H";
  //     case 2:
  //       return "Giám Định Kim Cương 48H";
  //     default:
  //       return "Unknown Service";
  //   }
  // };

  return (
    <div className="success-page">
      <div className="success-message">
        <div className="checkmark">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25" fill="none" />
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
        <h1>ĐẶT HẸN THÀNH CÔNG</h1>
        <p>Chúc mừng bạn đã đặt hẹn thành công, thông tin lịch hẹn</p>
        <div className="transaction-code">
          <h2>Mã giao dịch: #{state.bookingId}</h2>
          <div className="appointment-details">
            <p>Số Điện Thoại: {state.phone}</p>
            <p>Dịch Vụ: {state.serviceName}</p>
            <p>Số Lượng (Viên): {state.quantities}</p>
            <p>Ngày Đặt Hẹn: {state.dateCreated}</p>
          </div>
          <button onClick={() => navigate("/")}>Trang Chủ</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage

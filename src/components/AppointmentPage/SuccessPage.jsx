import React from 'react';
import './SuccessPage.scss';

const SuccessPage = ({ data }) => {
  return (
    <div className="success-page">
      <div className="success-message">
        <div className="checkmark">
          <svg viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="25" fill="none"/>
            <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h1>ĐẶT HẸN THÀNH CÔNG</h1>
        <p>Chúc mừng bạn đã đặt hẹn thành công, thông tin lịch hẹn</p>
        <div className="transaction-code">
          <h2>Mã giao dịch</h2>
          <div className="appointment-details">
            <p>Tên khách hàng: {data.name}</p>
            <p>Số điện thoại: {data.phone}</p>
            <p>Dịch vụ: {data.service}</p>
            <p>Số lượng(Viên): {data.quantity}</p>
            <p>Ngày hẹn: {data.date}</p>
            <p>Địa chỉ giao dịch: {data.address}</p>
          </div>
          <button>TẢI VỀ</button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

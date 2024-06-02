import React, { useState } from 'react';
import './AppointmentPage.scss';
import SuccessPage from './SuccessPage.jsx'; // Import the SuccessPage component

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    idCard: '',
    address: '',
    service: '',
    serviceType: '',
    quantity: '',
    date: new Date().toLocaleDateString() // Just an example date
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return <SuccessPage data={formData} />;
  }

  return (
    <div className="appointment-page">
      <div className="form-container">
        <h1>Đặt hẹn <span>CÁ NHÂN</span></h1>
        <form onSubmit={handleSubmit} className="appointment-form">
          <label>
            Tên khách hàng: *
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <div className="dual-input">
            <label>
              Số điện thoại: *
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              CCCD/CMT: *
              <input type="text" name="idCard" value={formData.idCard} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Địa chỉ: *
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </label>
          <label>
            Chọn dịch vụ:
            <input type="text" name="service" value={formData.service} onChange={handleChange} />
          </label>
          <label>
            Chọn loại dịch vụ:
            <input type="text" name="serviceType" value={formData.serviceType} onChange={handleChange} />
          </label>
          <label>
            Số lượng(Viên): *
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </label>
          <button type="submit">ĐẶT LỊCH</button>
        </form>
      </div>
      <div className="background-image"></div>
    </div>
  );
};

export default AppointmentPage;

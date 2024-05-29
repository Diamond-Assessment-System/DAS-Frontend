// src/components/Footer/Footer.js
import React from 'react';
import './Footer.scss';
import logo from '../../assets/logodas.png'; // Đảm bảo đường dẫn tới logo là đúng

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo-section">
        <div className="footer-logo">
          <img src={logo} alt="DAS Logo" />
        </div>
      </div>
      <div className="footer-section footer-links">
        <a href="/diamonds">Kim Cương</a>
        <a href="/features">Đặc Điểm Đá Quý</a>
        <a href="/lookup">Tra Cứu</a>
        <a href="/contact">Liên Hệ</a>
      </div>
      <div className="footer-section footer-contact">
        <p>Địa Chỉ: 304-306 Phan Xích Long, Phường 7, Quận Phú Nhuận, TP.Hồ Chí Minh, Việt Nam</p>
        <p>Email: example@gmail.com</p>
        <p>SDT: 0123456789</p>
      </div>
    </footer>
  );
};

export default Footer;

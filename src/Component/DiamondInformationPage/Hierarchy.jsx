import React from 'react';
import './Hierarchy.css';
import kimCuongImage from '../../assets/KimCuong.jpg'; // Adjust the path if necessary

const Hierarchy = () => {
  return (
    <div className="container">
      <div className="image-container">
        <img src={kimCuongImage} alt="Phân Cấp Kim Cương" />
        <div className="overlay-text">Phân Cấp Kim Cương</div>
      </div>
      <div className="content">
        <h2>Kim Cương</h2>
        <div className="section">
          <h3>Phân Cấp Màu Sắc - Color Grading</h3>
          <p>Thang phân cấp màu D-Z: Hệ thống phân cấp màu D-đến-Z của GIA đánh giá sự hiện diện hay vắng mặt của màu sắc – phổ biến là màu vàng nhạt, nâu nhạt và xám nhạt. Thang đo dùng để <a href="#">Xem chi tiết</a></p>
        </div>
        <div className="section">
          <h3>Cấp Độ Cắt Mài – Cut Grade</h3>
          <p>Cắt mài kim cương có thể hiểu đơn giản là hình dạng và kiểu cắt mài (hình dạng các mặt giác) của nó. Có nhiều kiểu cắt kim cương khác nhau, cho đến nay phổ biến nhất vẫn là kiểu <a href="#">Xem chi tiết</a></p>
        </div>
      </div>
    </div>
  );
};

export default Hierarchy;

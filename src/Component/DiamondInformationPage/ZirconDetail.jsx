// ZirconDetail.jsx
import React from 'react';
import './ZirconDetail.css'; // Import CSS file for styling

const ZirconDetail = () => {
  return (
    <div className="zircon-detail">
      <div className="zircon-detail-header">
        <img src={require('../../assets/Zircon.jpg').default} alt="Zircon" className="zircon-detail-image" />
        <div className="zircon-detail-header-text">
          <h1>ZIRCON</h1>
          <p>Loại đá quý có nhiều màu sắc và sự lấp lánh tuyệt vời</p>
        </div>
      </div>
      <div className="zircon-detail-content">
        <div className="zircon-detail-info">
          <h2>TỔNG QUAN</h2>
          <p>Zircon là loại đá quý có độ khúc xạ và lửa cao, có nhiều màu sắc như xanh dương, đỏ, vàng, cam, nâu, xanh lục.</p>
          <p><strong>Khoáng vật:</strong> Zircon</p>
          <p><strong>Công thức hóa học:</strong> ZrSiO4</p>
          <p><strong>Màu sắc:</strong> xanh dương, đỏ, vàng, cam, nâu, xanh lục</p>
          <p><strong>Chiết suất:</strong></p>
          <ul>
            <li>Zircon high: 1.925 – 1.984 (+/- 0.040)</li>
            <li>Zircon medium: 1.875 – 1.905 (+/- 0.030)</li>
            <li>Zircon Low: 1.810 – 1.815 (+/-0.030)</li>
          </ul>
          <p><strong>Hệ số lưỡng chiết suất:</strong> 0.000 – 0.059</p>
          <p><strong>Tỷ trọng:</strong> 3.90 – 4.73</p>
          <p><strong>Độ cứng Mohs:</strong> 6 – 7.5</p>
        </div>
        <div className="zircon-detail-image-right">
          <img src={require('../../assets/Zircon.jpg').default} alt="Zircon" />
          <p>Viên zircon màu cam với độ bão hòa cao.</p>
          <p>Nguồn: John Dyer, Zircon Super Trillion courtesy of John Dyer & Co.</p>
          <p><strong>ZIRCON – LOẠI ĐÁ QUÝ CỦA THÁNG 12</strong></p>
        </div>
      </div>
      <div className="zircon-detail-description">
        <h2>ZIRCON là gì?</h2>
        <p>Zircon là một trong những loại đá quý nổi tiếng với sự rực rỡ và lấp lánh của nó, thường được gọi là "lửa". Trong thời Trung cổ, Zircon là biểu tượng của sự may mắn và bảo vệ, đặc biệt là đối với những ai sinh vào tháng 12.</p>
        <p>Đạo Hindu cũng coi Zircon là một trong chín viên đá quý quan trọng (Navaratna), biểu tượng cho sự giàu có, trí tuệ và sức khỏe tốt.</p>
        <p>Những nơi nổi tiếng khai thác Zircon bao gồm vùng Elahera (Sri Lanka), dãy Harts (Úc), và các nước Đông Nam Á như Myanmar, Việt Nam và Campuchia.</p>
      </div>
    </div>
  );
};

export default ZirconDetail;

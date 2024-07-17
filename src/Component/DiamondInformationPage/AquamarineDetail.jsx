import React from 'react';
import './Detail.css'; // Import CSS file for styling
import AquamarineImage from '../../assets/aquamarine2.png'; // Import Aquamarine image
import Aquamarine from '../../assets/Aquamarine.jpg';
const AquamarineDetail = () => {
  return (
    <div className="detail">
      <br /><br />
      <div className="detail-header" >
        <img src={Aquamarine} alt="Aquamarine" className="detail-image" />
        <div className="detail-header-text">
          <h1>AQUAMARINE</h1>
          <p>Aquamarine là tên sử dụng cho Beryl có màu xanh dương, tên gọi bắt nguồn từ tiếng Latinh có nghĩa là “nước biển”.</p>
        </div>
      </div>
      <div className="detail-content">
        <div className="detail-info" style={{ textAlign: 'center' }}>
          <h2>TỔNG QUAN</h2>
          <p>
            Aquamarine là tên sử dụng cho Beryl có màu xanh dương, tên gọi bắt nguồn từ tiếng Latinh có nghĩa là “nước biển”.
          </p>
          <p><strong>Nhóm khoáng vật:</strong> Beryl</p>
          <p><strong>Công thức hóa học:</strong> Be3Al2Si6O18</p>
          <p><strong>Màu sắc:</strong> xanh dương đến xanh dương phớt lục, tông màu thường nhạt</p>
          <p><strong>Chiết suất:</strong> 1.577 – 1.583</p>
          <p><strong>Hệ số lưỡng chiết suất:</strong> 0.005 – 0.009</p>
          <p><strong>Tỷ trọng:</strong> 2.72</p>
          <p><strong>Độ cứng Mohs:</strong> 7.5 – 8.0</p>
        </div>
        <div className="detail-image-right">
          <img src={AquamarineImage} alt="Aquamarine" /> {/* Thay ảnh bằng ảnh khác nếu cần */}
          <p>Viên aquamarine màu xanh lam với độ bão hòa cao.</p>
          <p>Nguồn: Image Source</p>
          <p><strong>AQUAMARINE – LOẠI ĐÁ QUÝ CỦA THÁNG 3</strong></p>
        </div>
      </div>
      <div className="detail-description">
        <h2>AQUAMARINE – LOẠI ĐÁ QUÝ CỦA THÁNG 3</h2>
        <p>
          Aquamarine là loại đá quý đại diện cho những ai có sinh nhật vào tháng 3 – mang tông màu của nước biển, thường ít bao thể và trong như nước vì vậy Aquamarine có ý nghĩa tượng trưng cho sự thuần khiết của tinh thần và tâm hồn. Aquamarine còn được cho là có khả năng kết nối tình yêu, là biểu tượng của tình yêu vĩnh cửu.
        </p>
        <h2>NƠI NÀO KHAI THÁC AQUAMARINE?</h2>
        <p>
          Đến nay bang Minas Gerais của Brazil vẫn là nguồn cung cấp Aquamarine quan trọng, các viên đá ở đây được tìm thấy trong pegmatic nguyên sinh (đá gốc) và thứ sinh (phong hóa), chúng thường có kích thước lớn và chất lượng tốt. Các nguồn cung quan trọng khác bao gồm Pakistan, Madagasca, Mozambique, Nigeria, Việt Nam,....
        </p>
      </div>
    </div>
  );
};

export default AquamarineDetail;

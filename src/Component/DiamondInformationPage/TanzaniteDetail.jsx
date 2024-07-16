import React from 'react';
import './Detail.css'; // Import CSS file for styling
import TanzaniteImage from '../../assets/tanzanite.png'; // Import Tanzanite image
import Tanzanite from '../../assets/Tanzanite.jpg'

const TanzaniteDetail = () => {
  return (
    <div className="detail">
      <br /><br />
      <div className="detail-header" style={{ marginTop: '50rem' }}>
        <img src={Tanzanite} alt="Tanzanite" className="detail-image" />
        <div className="detail-header-text">
          <h1>TANZANITE</h1>
          <p>Tanzanite là loại đá có màu pha trộn giữa màu tím rực rỡ, màu tía đậm và màu xanh dương</p>
        </div>
      </div>
      <div className="detail-content">
        <div className="detail-info" style={{ textAlign: 'center' }}>
          <h2>TỔNG QUAN</h2>
          <p>
            Tanzanite là loại đá có màu pha trộn giữa màu tím rực rỡ, màu tía đậm và màu xanh dương, loại đá này chỉ được tìm thấy ở một nơi duy nhất trên thế giới – đồi Merelani ở phía bắc Tanzania.
          </p>
          <p><strong>Nhóm khoáng vật:</strong> Zoisite</p>
          <p><strong>Công thức hóa học:</strong> Ca2Al3(SiO4)3(OH)</p>
          <p><strong>Màu sắc:</strong> xanh dương đến tím, tía phớt xanh dương</p>
          <p><strong>Chiết suất:</strong> 1.691 – 1.700</p>
          <p><strong>Hệ số lưỡng chiết suất:</strong> 0.008 – 0.013</p>
          <p><strong>Tỷ trọng:</strong> 3.35</p>
          <p><strong>Độ cứng Mohs:</strong> 6 – 7</p>
        </div>
        <div className="detail-image-right">
          <img src={TanzaniteImage} alt="Tanzanite" /> {/* Thay ảnh bằng ảnh khác nếu cần */}
          <p>Viên tanzanite màu xanh lam tím với độ bão hòa cao.</p>
          <p>Nguồn: Image Source</p>
          <p><strong>TANZANITE – LOẠI ĐÁ QUÝ CỦA THÁNG 12</strong></p>
        </div>
      </div>
      <div className="detail-description">
        <h2>TANZANITE – LOẠI ĐÁ QUÝ CỦA THÁNG 12</h2>
        <p>
          Tanzanite là loại đá quý đại diện cho những ai có sinh nhật vào tháng 12 – là loại đá có màu xanh lam tím thuộc nhóm khoáng vật Zoisite, nó là loại đá quý tương đối mới trong thế giới đá màu, thường được mô tả là “mịn như nhung” để chỉ màu sắc đậm, bão hòa và độ tinh khiết cao. Đặc điểm độc đáo của loại đá này là tính đa sắc – có thể thấy ba màu riêng biệt khi xoay viên đá theo ba hướng khác nhau.
        </p>
        <p>
          Tương truyền, Tanzanite sẽ mang đến may mắn và giúp bạn hoàn thành các mục tiêu trong cuộc sống. Tanzanite còn được biết đến với khả năng tăng cường nhận thức và sáng tạo.
        </p>
        <h2>NƠI NÀO KHAI THÁC TANZANITE?</h2>
        <p>
          Được phát hiện vào năm 1967 trên ngọn đồi Meralani ở phía bắc Tanzania – nơi đây là nguồn cung duy nhất của Tanzanite cho đến ngày nay.
        </p>
      </div>
    </div>
  );
};

export default TanzaniteDetail;

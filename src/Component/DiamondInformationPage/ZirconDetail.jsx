import React from 'react';
import './Detail.css'; // Import CSS file for styling
import ZirconImage from '../../assets/ZIRCON2.png'; // Import Zircon image
import Zircon from '../../assets/Zircon.jpg'

const ZirconDetail = () => {
  return (
    <div className="detail" >
      <br /><br />
      <div className="detail-header">
        <img src={Zircon} alt="Zircon" className="detail-image" />
        <div className="detail-header-text">
          <h1>ZIRCON</h1>
          <p>Zircon là loại đá đa màu sắc, có độ khúc xạ và lửa cao.</p>
        </div>
      </div>
      <div className="detail-content">
        <div className="detail-info" style={{ textAlign: 'center' }}>
          <h2>TỔNG QUAN</h2>
          <p>Zircon là loại đá đa màu sắc, có độ khúc xạ và lửa cao.</p>
          <p><strong>Khoáng vật:</strong> Zircon</p>
          <p><strong>Công thức hóa học:</strong> ZrSiO4</p>
          <p><strong>Màu sắc:</strong> xanh dương, đỏ, vàng, cam, nâu, xanh lục</p>
          <p><strong>Chiết suất:</strong></p>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>Zircon high: 1.925 – 1.984 (+/- 0.040)</li>
            <li>Zircon medium: 1.875 – 1.905 (+/- 0.030)</li>
            <li>Zircon Low: 1.810 – 1.815 (+/-0.030)</li>
          </ul>
          <p><strong>Hệ số lưỡng chiết suất:</strong> 0.000 – 0.059</p>
          <p><strong>Tỷ trọng:</strong> 3.90 – 4.73</p>
          <p><strong>Độ cứng Mohs:</strong> 6 – 7.5</p>
        </div>
        <div className="detail-image-right">
          <img src={ZirconImage} alt="Zircon" /> {/* Thay ảnh bằng ảnh khác nếu cần */}
          <p>Viên zircon màu cam với độ bão hòa cao.</p>
          <p>Nguồn: John Dyer, Zircon Super Trillion courtesy of John Dyer & Co.</p>
          {/* <p><strong>ZIRCON – LOẠI ĐÁ QUÝ CỦA THÁNG 12</strong></p> */}
        </div>
      </div>
      <div className="detail-description">
        <h2>ZIRCON – LOẠI ĐÁ QUÝ CỦA THÁNG 12</h2>
        <p>
          Zircon là một trong những loại đá được biết đến vì sở hữu sự rực rỡ và lấp lánh nhiều màu sắc hay còn được gọi là “lửa”. Trong suốt thời đại Trung cổ, Zircon – một trong những loại đá đại diện cho những ai sinh vào tháng 12, được cho là sẽ giúp người đeo ngủ ngon và xua đuổi tà ma. Ngoài ra, đạo Hindu còn đề cập đến Zircon cùng với Hessonite Garnet là một trong chín loại đá quý Navaratna (Navaratna – “chín viên đá quý”, được biết đến là loại bùa mạnh nhất trong đạo Hindu. Chín loại đá quý này đại diện cho các thiên thể trong chiêm tinh học của Ấn Độ). Khi đeo các loại đá quý Navaratna cùng nhau, các loại đá quý này sẽ bảo vệ người đeo và mang lại sự giàu có, trí tuệ và sức khỏe tốt.
        </p>
        <h2>NƠI NÀO KHAI THÁC ZIRCON?</h2>
        <p>
          Vùng Elahera thuộc miền trung Sri Lanka là một trong những khu vực cung cấp cho thị trường một lượng lớn Zircon. Dãy Harts thuộc nước Úc được biết đến là nơi khai thác Zircon có màu vàng nâu, nâu phớt cam, hồng và tía. Ngoài ra, Zircon còn được khai thác nhiều ở các nước Đông Nam Á như Myanmar, Việt Nam và Campuchia.
        </p>
      </div>
    </div>
  );
};

export default ZirconDetail;

import React from 'react';
import './Detail.css'; // Import CSS file for styling
import CoralImage from '../../assets/coral.png'; // Import Coral image
import SanHo from '../../assets/San-ho.jpg'

const CoralDetail = () => {
  return (
    <div className="detail">
      <br /><br />
      <div className="detail-header">
        <img src={SanHo} alt="Coral" className="detail-image" />
        <div className="detail-header-text">
          <h1>CORAL – SAN HÔ</h1>
          <p>San hô có nguồn gốc hữu cơ và đã được sử dụng làm vật dụng trang trí từ hàng nghìn năm trước.</p>
        </div>
      </div>
      <div className="detail-content">
        <div className="detail-info" style={{ textAlign: 'center' }}>
          <h2>TỔNG QUAN</h2>
          <p>
            San hô có nguồn gốc hữu cơ và đã được sử dụng làm vật dụng trang trí từ hàng nghìn năm trước.
          </p>
          <p><strong>Khoáng vật:</strong> Calci Carbonat</p>
          <p><strong>Công thức hóa học:</strong> CaCO3</p>
          <p><strong>Màu sắc:</strong> hồng, đỏ, cam, trắng, xanh dương, tía, kem</p>
          <p><strong>Chiết suất:</strong> 1.486 – 1.658</p>
          <p><strong>Hệ số lưỡng chiết suất:</strong> 0.172</p>
          <p><strong>Tỷ trọng:</strong> 2.60 – 2.70</p>
          <p><strong>Độ cứng Mohs:</strong> 3.5 – 4</p>
        </div>
        <div className="detail-image-right">
          <img src={CoralImage} alt="Coral" /> {/* Thay ảnh bằng ảnh khác nếu cần */}
          <p>San hô thường có dạng nhánh cây, và là vật liệu lý tưởng để chạm khắc.</p>
          <p>Nguồn: Robert Weldon/GIA</p>
          <p><strong>ĐÔI ĐIỀU VỀ SAN HÔ</strong></p>
        </div>
      </div>
      <div className="detail-description">
        <h2>ĐÔI ĐIỀU VỀ SAN HÔ</h2>
        <p>
          San hô đã được biết đến trong các món đồ trang sức cách đây 30000 năm trước. Ngoài ra, San hô còn được sử dụng làm vật trang trí và người cổ đại còn cho rằng San hô mang một năng lượng ma thuật mà có thể bảo vệ người đeo nó tránh khỏi sự chết chóc. Bùa hộ mệnh được làm bằng San hô đỏ có niên đại 8000 năm trước Công nguyên được phát hiện trong các ngôi mộ thời kỳ đồ đá mới (Neolithic) tại Thụy Sĩ. Đồ trang sức bằng San hô được làm ở Sumeria và Ai Cập vào khoảng 3000 năm trước Công nguyên và các nền văn hóa Trung Quốc đã xem San hô là vật phẩm có giá trị cao cách đây khoảng 1000 năm trước Công nguyên (Liverino, 1989).
        </p>
        <p>
          San hô thường có hình dạng nhánh, do đó San hô không chỉ được sử dụng làm đồ trang sức mà còn được dùng để chạm khắc và điêu khắc tạo nên những tác phẩm ấn tượng làm nổi bật hình dạng tự nhiên của San hô. Vùng Torre del Greco gần thành phố Naples của nước Ý có truyền thống lâu đời là trung tâm thời trang quan trọng về San hô.
        </p>
        <h2>NƠI NÀO KHAI THÁC SAN HÔ?</h2>
        <p>
          Vùng biển Địa Trung Hải từng là nguồn cung cấp chính các loại San hô, đặc biệt là San hô có màu đỏ và hồng cho các vùng chế tác tại nước Ý. Tuy nhiên, việc khai thác quá mức và sự ô nhiễm đã gần như xóa sổ San hô đỏ dọc theo bờ biển Châu Phi và Châu Âu. Do đó, các nghệ nhân ở Naples chủ yếu phải dựa vào nguồn cung San hô từ các vùng biển tại Nhật Bản, Malaysia và Phillipin. Thật không may, phần lớn San hô từ Châu Á thường không có chất lượng tốt như San hô tại vùng biển Địa Trung Hải. Bên cạnh đó, Đài Loan cũng là nơi cung cấp San hô đỏ và hồng cho thị trường Trung Quốc.
        </p>
      </div>
    </div>
  );
};

export default CoralDetail;

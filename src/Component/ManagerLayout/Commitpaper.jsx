import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import '../ManagerLayout/Commitpaper.css';
import { createCommitmentPaper } from "../../utils/commitmentPaperUtils";
import getOrderDetails from "../../utils/getOrderDetails";

const CommitmentPaperPage = () => {
  const location = useLocation();
  const { bookingId } = location.state;
  const [formData, setFormData] = useState({
    description: '',
    dateCreated: '',
    approvalDate: '',
    commitmentType: 'Default Type',
    title: '',
    status: 0,
    bookingId: bookingId,
    accountId: 0 // Set this according to your logic or get from user data
  });
  const navigate = useNavigate();
  const paperRef = useRef();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDetails = await getOrderDetails(bookingId);
        setFormData(prevFormData => ({
          ...prevFormData,
          dateCreated: orderDetails.dateCreated || new Date().toISOString(),
          approvalDate: new Date().toISOString(),
          accountId: orderDetails.accountId, // Assuming orderDetails contains accountId
          title: orderDetails.title || '',
          description: orderDetails.description || ''
        }));
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCommitmentPaper(formData);
      const dataUrl = await toPng(paperRef.current, { backgroundColor: 'white' });
      navigate('/manager/commitmentdownload', { state: { imageUrl: dataUrl } });
    } catch (error) {
      console.error('Error generating image or saving commitment paper:', error);
    }
  };

  return (
    <div className="paper-container">
      <div className="paper-content" ref={paperRef} style={{ backgroundColor: 'white' }}>
        <div className="headerr">
          <div className="left">
            <p>CƠ QUAN, ĐƠN VỊ DAS STORE</p>
            <p>Số: {formData.bookingId}</p>
          </div>
          <div className="right">
            <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
            <p>Độc lập - Tự do - Hạnh phúc</p>
            <p>{new Date().toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}</p>
          </div>
        </div>
        <div className="title-section">
          <h2>BIÊN BẢN GIÁM ĐỊNH</h2>
          <div className="field centered-field">
            <label className="label">Về việc:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input centered-input"
              required
            />
          </div>
        </div>
        <div className="field">
          <p>Tại: 304-306 Phan Xích Long, Phường 7, Quận Phú Nhuận, TP.Hồ Chí Minh, Việt Nam</p>
          <div className="field">
            <label className="label">Mô tả:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="textarea"
              required
            ></textarea>
          </div>
          <p>Đơn hàng: {formData.bookingId}</p>
        </div>
        <div className="field">
          <p>Người dùng: Ông/Bà {formData.userName}</p>
        </div>
        <div className="signature-section">
          <div className="date">
            <p>Ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}</p>
          </div>
          <div className="signatures">
            <div className="left-signature">
              <p><strong>Bên giao</strong></p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
            <div className="right-signature">
              <p><strong>Bên nhận</strong></p>
              <p>(Ký, ghi rõ họ tên)</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="button create-button">Tạo biên bản</button>
    </div>
  );
};

export default CommitmentPaperPage;

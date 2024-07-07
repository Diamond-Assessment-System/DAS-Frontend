import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import '../ManagerLayout/Commitpaper.css';
import getOrderDetails from "../../utils/getOrderDetails"; // Assume you have a function to get order details
import { changeSampleStatus } from "../../utils/changeSampleStatus"; // Import the function to change sample status

const CommitmentPaperPage = () => {
    const location = useLocation();
    const { bookingId } = location.state;
    const [formData, setFormData] = useState({
        creationDate: '',
        userName: 'Nguyễn Văn A',
        bookingId: bookingId,
        title: '',
        description: '',
        signature: ''
    });
    const navigate = useNavigate();
    const paperRef = useRef();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const orderDetails = await getOrderDetails(bookingId);
            setFormData(prevData => ({
                ...prevData,
                creationDate: orderDetails.creationDate || new Date().toISOString().split('T')[0],
                userName: orderDetails.userName || 'Nguyễn Văn A',
                title: orderDetails.title || '',
                description: orderDetails.description || ''
            }));
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
            // Change the status of the booking to "Đã Seal"
            await changeSampleStatus(bookingId, 4);

            // Generate the image of the commitment paper
            const dataUrl = await toPng(paperRef.current, { backgroundColor: 'white' });

            // Navigate to the download page with the generated image URL
            navigate('/manager/commitmentdownload', { state: { imageUrl: dataUrl } });
        } catch (error) {
            console.error('Error generating image or changing status:', error);
        }
    };

    return (
        <div className="paper-container">
            <div className="paper-content" ref={paperRef} style={{ backgroundColor: 'white' }}>
                <div className="headerr">
                    <div className="left">
                        <p>CƠ QUAN, ĐƠN VỊ DAS STORE</p>
                        <p>Số: ....................</p>
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
                    <p>Hôm nay, vào ngày {formData.creationDate.split('-')[2]} tháng {formData.creationDate.split('-')[1]} năm {formData.creationDate.split('-')[0]}</p>
                    <p>Tại: ...................................................</p>
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

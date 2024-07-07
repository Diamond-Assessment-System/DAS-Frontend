import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import getAccountFromId from '../../utils/getAccountFromId'; // Đường dẫn tới file getAccountFromId
import getBookingFromId from '../../utils/getBookingFromId'; // Đường dẫn tới file getBookingFromId
import { CONSULTING_COMMITMENT_PAPER } from '../../utils/apiEndPoints'; // Đường dẫn tới apiEndPoints
import axios from 'axios';
import './Commitpaper.css';

const CommitmentPaperPage = () => {
    const [formData, setFormData] = useState({
        creationDate: '',
        userName: '',
        orderId: '',
        title: '',
        description: '',
        signature: ''
    });
    const [bookingId, setBookingId] = useState('DH001'); // Đặt giá trị này theo cách bạn nhận được bookingId
    const paperRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy thông tin đơn hàng và tài khoản từ API
                const bookingData = await getBookingFromId(bookingId);
                const accountData = await getAccountFromId(bookingData.accountId);

                setFormData({
                    creationDate: new Date().toISOString().split('T')[0],
                    orderId: bookingId,
                    title: bookingData.title,
                    description: '',
                    userName: `Ông/Bà ${accountData.fullName}`
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
            // Tạo biên bản và lấy ảnh dưới dạng URL
            const dataUrl = await toPng(paperRef.current, {
                bgcolor: '#fff',
                width: 2100, // 210mm = 21cm = 2100px
                height: 2970 // 297mm = 29.7cm = 2970px
            });

            // Gửi dữ liệu lên API
            await axios.post(CONSULTING_COMMITMENT_PAPER, {
                ...formData,
                imageUrl: dataUrl
            });

            // Điều hướng đến trang xem ảnh của biên bản
            navigate('/manager/commitpaperimage', { state: { imageUrl: dataUrl } });
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    };

    return (
        <div className="paper-container">
            <div className="paper-content" ref={paperRef}>
                <div className="headerr">
                    <div className="left">
                        <p>CƠ QUAN, ĐƠN VỊ....</p>
                        <p>Số: {formData.orderId}</p>
                    </div>
                    <div className="right">
                        <p>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</p>
                        <p>Độc lập - Tự do - Hạnh phúc</p>
                        <p>{`${new Date().toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        })}`}</p>
                    </div>
                </div>
                <div className="title-section">
                    <h2>BIÊN BẢN GIÁM ĐỊNH</h2>
                    <p>Về việc: {formData.title}</p>
                </div>
                <div className="field">
                    <p>Hôm nay, vào ngày {formData.creationDate.split('-')[2]} tháng {formData.creationDate.split('-')[1]} năm {formData.creationDate.split('-')[0]}</p>
                    <p>Tại: ...................................................</p>
                    <p>Mô tả: {formData.description}</p>
                    <p>Đơn hàng: {formData.orderId}</p>
                </div>
                <div className="field">
                    <p>Người dùng: {formData.userName}</p>
                </div>
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

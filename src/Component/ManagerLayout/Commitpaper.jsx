import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import '../ManagerLayout/Commitpaper.css';

const CommitmentPaperPage = () => {
    const location = useLocation();
    const { diamondData, orderId } = location.state;
    const [formData, setFormData] = useState({
        creationDate: '',
        userName: 'Nguyễn Văn A',
        orderId: orderId,
        title: '',
        description: '',
        signature: ''
    });
    const navigate = useNavigate();
    const paperRef = useRef();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setFormData(prevData => ({ ...prevData, creationDate: today }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toPng(paperRef.current)
            .then((dataUrl) => {
                navigate('/manager/managerhistory');
            })
            .catch((error) => {
                console.error('Error generating image:', error);
            });
    };

    return (
        <div className="paper-container">
            <div className="paper-content" ref={paperRef}>
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
                    <p>Đơn hàng: {formData.orderId}</p>
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

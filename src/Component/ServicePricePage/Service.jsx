import React from "react";
import "./style.css";

export const EvaluateService = () => {
    return (
        <div className="evaluate-service">
            <div className="service-section">
                <h2 className="section-title">CÁC DỊCH VỤ GIÁM ĐỊNH KIM CƯƠNG HIỆN CÓ TẠI DAS</h2>
                <div className="service-list">
                    <div className="service-item">
                        <h3>Dịch vụ tiêu chuẩn</h3>
                        <p>– Thời gian gửi thực hiện giám định tùy theo từng thời điểm gửi.</p>
                        <p>– Số lượng không hạn chế. Bảng giá dịch vụ theo quy định.</p>
                    </div>
                    <div className="service-item">
                        <h3>Dịch vụ nhanh</h3>
                        <p>– Thời gian thực hiện giám định trong 3 giờ làm việc tính từ lúc nhận sản phẩm vào.</p>
                        <p>– Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo quy định.</p>
                    </div>
                    <div className="service-item">
                        <h3>Dịch vụ đặc biệt</h3>
                        <p>– Thời gian thực hiện giám định trong 48 giờ làm việc tính từ lúc nhận sản phẩm vào.</p>
                        <p>– Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo quy định.</p>
                    </div>
                </div>
            </div>
            <div className="standard-section">
                <h2 className="section-title">TIÊU CHUẨN GIÁM ĐỊNH KIM CƯƠNG DAS</h2>
                <div className="standard-list">
                    <div className="standard-item">
                        <h3>Kim cương thiên nhiên</h3>
                        <p>– Nội Dung: Kim cương thiên nhiên (Natural Diamond)</p>
                        <p>– Từ 3.00mm trở lên.</p>
                        <p>– Tất cả các dạng cắt mài.</p>
                        <p>– Thang tiêu chuẩn: Từ màu D đến Z</p>
                        <p>– Thang tiêu chuẩn: FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI2, I1-I2-I3.</p>
                        <p>– Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor</p>
                        <p>– Chỉ thực hiện phân cấp với viên có dạng cắt mài (shape&cut): Round Brilliant.</p>
                    </div>
                    <div className="standard-item">
                        <h3>Đo các thông số</h3>
                        <p>– Đo các thông số tỉ lệ cắt mài viên đá.</p>
                        <p>– Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor</p>
                        <p>– Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm.</p>
                    </div>
                    <div className="standard-item">
                        <h3>Phân loại màu sắc</h3>
                        <p>– Thang tiêu chuẩn: None, Faint, Medium, Strong, Very Strong.</p>
                        <p>– Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm.</p>
                    </div>
                    <div className="standard-item">
                        <h3>Giám định PNJLab</h3>
                        <p>– Tất cả viên đá được PNJLab thực hiện giám định.</p>
                        <p>– Phát hành Giấy giám định những viên có kích thước (size) trên 4.00mm.</p>
                        <p>– Không phát hành Giấy giám định những viên có kích thước (size) từ 3.00 đến 3.99mm.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

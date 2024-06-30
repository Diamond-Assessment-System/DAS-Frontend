import React from "react";
import "./style.css";

export const EvaluateService = () => {
    // Dummy data for service evaluation
    const dummyData = [
        { stt: 1, loaiDichVu: "Giám định thường", noiDung: [
            "Thời gian gửi thực hiện giám định tùy theo từng thời điểm gửi.",
            "Số lượng không hạn chế. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 2, loaiDichVu: "Giám định nhanh 3h", noiDung: [
            "Thời gian thực hiện giám định trong 3 giờ làm việc tính từ lúc nhận sản phẩm vào.",
            "Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 3, loaiDichVu: "Giám định nhanh 48h", noiDung: [
            "Thời gian thực hiện giám định trong 48 giờ làm việc tính từ lúc nhận sản phẩm vào.",
            "Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 4, loaiDichVu: "Niêm phong thường (Seal lại)", noiDung: [
            "Thời gian gửi thực hiện giám định tùy theo từng thời điểm gửi.",
            "Số lượng không hạn chế. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 5, loaiDichVu: "Niêm phong (Seal lại nhanh 3h)", noiDung: [
            "Thời gian thực hiện giám định trong 3 giờ làm việc tính từ lúc nhận sản phẩm vào.",
            "Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 6, loaiDichVu: "Niêm phong (Seal lại nhanh 48h)", noiDung: [
            "Thời gian thực hiện giám định trong 48 giờ làm việc tính từ lúc nhận sản phẩm vào.",
            "Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định."
        ] },
        { stt: 7, loaiDichVu: "Cấp lại giấy giám định", noiDung: [
            "Thực hiện cấp lại giấy giám định theo yêu cầu khách hàng."
        ] },
        { stt: 8, loaiDichVu: "Khắc mã số cạnh", noiDung: [
            "Thực hiện khắc mã số cạnh trên viên đá theo yêu cầu.",
            "Chỉ thực hiện khắc những viên đá có kích thước (size) trên 4.00mm."
        ] }
    ];

    // Dummy data for PNJLAB diamond standards
    const dummyDiamondStandards = [
        { stt: 1, tieuChuan: "Loại đá", noiDung: "Kim cương thiên nhiên (Natural Diamond)" },
        { stt: 2, tieuChuan: "Kích thước (Measurements)", noiDung: "Từ 3.00mm trở lên." },
        { stt: 3, tieuChuan: "Dạng cắt mài (Shape&cut)", noiDung: "Tất cả các dạng cắt mài." },
        { stt: 4, tieuChuan: "Màu sắc (Color)", noiDung: "Thang tiêu chuẩn: Từ màu D đến Z" },
        { stt: 5, tieuChuan: "Độ tinh khiết (Clarity)", noiDung: "Thang tiêu chuẩn: FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI2, I1-I2-I3." },
        { stt: 6, tieuChuan: "Cắt mài (Cut)", noiDung: [
            "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor",
            "Chỉ thực hiện phân cấp với viên có dạng cắt mài (shape&cut): Round Brilliant."
        ] },
        { stt: 7, tieuChuan: "Tỉ lệ cắt mài (Proportions)", noiDung: "Đo các thông số tỉ lệ cắt mài viên đá." },
        { stt: 8, tieuChuan: "Mài bóng (Polish) Đối xứng (Symmetry)", noiDung: [
            "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor",
            "Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm."
        ] },
        { stt: 9, tieuChuan: "Phát quang (Fluorescence)", noiDung: [
            "Thang tiêu chuẩn: None, Faint, Medium, Strong, Very Strong.",
            "Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm."
        ] },
        { stt: 10, tieuChuan: "Niêm phong (Ép Seal)", noiDung: "Tất cả viên đá được PNJLab thực hiện giám định." },
        { stt: 11, tieuChuan: "Giấy giám định (Diamond Grading Report)", noiDung: [
            "Phát hành Giấy giám định những viên có kích thước (size) trên 4.00mm.",
            "Không phát hành Giấy giám định những viên có kích thước (size) từ 3.00 đến 3.99mm."
        ] }
    ];

    return (
        <div className="evaluate-service mt-20">
            <div className="section">
                <p className="header">CÁC DỊCH VỤ GIÁM ĐỊNH KIM CƯƠNG HIỆN CÓ TẠI DAS</p>
                <div className="table-container">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>LOẠI DỊCH VỤ</th>
                                <th>NỘI DUNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.stt}</td>
                                    <td>{item.loaiDichVu}</td>
                                    <td>
                                        <ul>
                                            {item.noiDung.map((detail, idx) => (
                                                <li key={idx}>{detail}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="section">
                <p className="header">TIÊU CHUẨN GIÁM ĐỊNH KIM CƯƠNG PNJLAB</p>
                <div className="table-container">
                    <table className="service-table">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>TIÊU CHUẨN GIÁM ĐỊNH</th>
                                <th>NỘI DUNG</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyDiamondStandards.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.stt}</td>
                                    <td>{item.tieuChuan}</td>
                                    <td>
                                        {typeof item.noiDung === "string" ? (
                                            item.noiDung
                                        ) : (
                                            <ul>
                                                {item.noiDung.map((detail, idx) => (
                                                    <li key={idx}>{detail}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

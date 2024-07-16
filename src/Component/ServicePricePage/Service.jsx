import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";
import "./Service.css";
import ContactModal from "../contact/ContactModal"; // Đảm bảo đường dẫn đến ContactModal là chính xác

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const EvaluateService = () => {
    const [serviceData, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await axios.get(SERVICES_URL);
            setServices(response.data);
          } catch (error) {
            console.error("Error fetching the services:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchServices();
      }, []);
    
    // const serviceData = [
    //     { serviceId: "1", serviceName: "Giám định thường", description: "Thời gian gửi thực hiện giám định tùy theo từng thời điểm gửi.<br />Số lượng không hạn chế. Bảng giá dịch vụ theo qui định.", price: "100 000" },
    //     { serviceId: "2", serviceName: "Giám định nhanh 3h", description: "Thời gian thực hiện giám định trong 3 giờ làm việc tính từ lúc nhận sản phẩm vào.<br />Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định.", price: "200 000" },
    //     { serviceId: "3", serviceName: "Giám định nhanh 48h", description: "Thời gian thực hiện giám định trong 48 giờ làm việc tính từ lúc nhận sản phẩm vào.<br />Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định.", price: "300 000" },
    //     { serviceId: "4", serviceName: "Niêm phong thường (Seal lại)", description: "Thời gian gửi thực hiện giám định tùy theo từng thời điểm gửi.<br />Số lượng không hạn chế. Bảng giá dịch vụ theo qui định.", price: "400 000" },
    //     { serviceId: "5", serviceName: "Niêm phong (Seal lại nhanh 3h)", description: "Thời gian thực hiện giám định trong 3 giờ làm việc tính từ lúc nhận sản phẩm vào.<br />Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định.", price: "500 000" },
    //     { serviceId: "6", serviceName: "Niêm phong (Seal lại nhanh 48h)", description: "Thời gian thực hiện giám định trong 48 giờ làm việc tính từ lúc nhận sản phẩm vào.<br />Số lượng gửi tùy từng thời điểm. Bảng giá dịch vụ theo qui định.", price: "600 000" },
    //     { serviceId: "7", serviceName: "Cấp lại giấy giám định", description: "Thực hiện cấp lại giấy giám định theo yêu cầu khách hàng.", price: "700 000" },
    //     { serviceId: "8", serviceName: "Khắc mã số cạnh", description: "Thực hiện khắc mã số cạnh trên viên đá theo yêu cầu.<br />Chỉ thực hiện khắc những viên đá có kích thước (size) trên 4.00mm.", price: "800 000" },
    //   ];

    const standardData = [
        { standardId: "1", standardName: "Loại đá", description: "Kim cương thiên nhiên (Natural Diamond)" },
        { standardId: "2", standardName: "Kích thước (Measurements)", description: "Từ 3.00mm trở lên."},
        { standardId: "3", standardName: "Dạng cắt mài (Shape&cut)", description: "Tất cả các dạng cắt mài."},
        { standardId: "4", standardName: "Màu sắc (Color)", description: "Thang tiêu chuẩn: Từ màu D đến Z"},
        { standardId: "5", standardName: "	Độ tinh khiết (Clarity)", description: "Thang tiêu chuẩn: FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI2, I1-I2-I3."},
        { standardId: "6", standardName: "	Cắt mài (Cut)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Chỉ thực hiên phân cấp với viên có dạng cắt mài (shape&cut): Round Brilliant."},
        { standardId: "7", standardName: "	Tỉ lệ cắt mài (Proportions)", description: "Đo các thông số tỉ lệ cắt mài viên đá."},
        { standardId: "8", standardName: "	Mài bóng (Polish)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm."},
        { standardId: "9", standardName: "	Đối xứng (Symmetry)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm."},
        { standardId: "10", standardName: "	Phát quang (Fluorescence)", description: "Thang tiêu chuẩn: None, Faint, Medium, Strong, Very Strong.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm."},
        { standardId: "11", standardName: "Niêm phong (Ép Seal)", description: "Tất cả viên đá được PNJLab thực hiện giám định."},
        { standardId: "12", standardName: "	Giấy giám định (Diamond Grading Report)", description: "Phát hành Giấy giám định những viên có kích thước (size) trên 4.00mm.<br />Không phát hành Giấy giám định những viên có kích thước (size) từ 3.00 đến 3.99mm."},

      ];

      if (loading) {
        return (
          <div className="loading-indicator">
            <Spinner />
          </div>
        );
      }

    return (
      <div className="evaluate-service">
        <ContactModal/>
      <div className="section">
        <p className="headerService">CÁC DỊCH VỤ GIÁM ĐỊNH KIM CƯƠNG HIỆN CÓ TẠI DAS</p>
        <div className="table-container">
          <table className="service-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>LOẠI DỊCH VỤ</th>
                <th>NỘI DUNG</th>
                <th>GIÁ DỊCH VỤ</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.serviceName}</td>
                  <td dangerouslySetInnerHTML={{ __html: service.serviceDescription }}></td>
                  <td style={{ textAlign: "right", paddingRight: "10px" }}>
                    {formatPrice(service.servicePrice)} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="section">
        <p className="headerService">TIÊU CHUẨN GIÁM ĐỊNH KIM CƯƠNG PNJLAB</p>
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
              {standardData.map((standard, index) => (
                <tr key={index}>
                  <td>{standard.standardId}</td>
                  <td>{standard.standardName}</td>
                  <td dangerouslySetInnerHTML={{ __html: standard.description }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
};

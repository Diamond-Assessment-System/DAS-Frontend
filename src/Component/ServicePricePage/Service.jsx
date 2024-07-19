import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";
import ContactModal from "../contact/ContactModal"; // Ensure the path to ContactModal is correct
import backgroundImage from "../../assets/backgroundcus.png"; // Ensure the path to your background image is correct

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

  const standardData = [
    { standardId: "1", standardName: "Loại đá", description: "Kim cương thiên nhiên (Natural Diamond)" },
    { standardId: "2", standardName: "Kích thước (Measurements)", description: "Từ 3.00mm trở lên." },
    { standardId: "3", standardName: "Dạng cắt mài (Shape&cut)", description: "Tất cả các dạng cắt mài." },
    { standardId: "4", standardName: "Màu sắc (Color)", description: "Thang tiêu chuẩn: Từ màu D đến Z" },
    { standardId: "5", standardName: "Độ tinh khiết (Clarity)", description: "Thang tiêu chuẩn: FL, IF, VVS1-VVS2, VS1-VS2, SI1-SI2, I1-I2-I3." },
    { standardId: "6", standardName: "Cắt mài (Cut)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Chỉ thực hiện phân cấp với viên có dạng cắt mài (shape&cut): Round Brilliant." },
    { standardId: "7", standardName: "Tỉ lệ cắt mài (Proportions)", description: "Đo các thông số tỉ lệ cắt mài viên đá." },
    { standardId: "8", standardName: "Mài bóng (Polish)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm." },
    { standardId: "9", standardName: "Đối xứng (Symmetry)", description: "Thang tiêu chuẩn: Excellent, Very Good, Good, Fair, Poor.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm." },
    { standardId: "10", standardName: "Phát quang (Fluorescence)", description: "Thang tiêu chuẩn: None, Faint, Medium, Strong, Very Strong.<br />Không thực hiện phân cấp những viên có kích thước (size) từ 3.00 đến 3.99mm." },
    { standardId: "11", standardName: "Niêm phong (Ép Seal)", description: "Tất cả viên đá được PNJLab thực hiện giám định." },
    { standardId: "12", standardName: "Giấy giám định (Diamond Grading Report)", description: "Phát hành Giấy giám định những viên có kích thước (size) trên 4.00mm.<br />Không phát hành Giấy giám định những viên có kích thước (size) từ 3.00 đến 3.99mm." },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, marginTop:'5rem'}}
    >
      <ContactModal />
      <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-lg w-full max-w-6xl mt-12">
        <p className="text-2xl font-bold mb-8 text-center text-gray-800">
          CÁC DỊCH VỤ GIÁM ĐỊNH KIM CƯƠNG HIỆN CÓ TẠI DAS
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-center">STT</th>
                <th className="py-4 px-6 text-center">LOẠI DỊCH VỤ</th>
                <th className="py-4 px-6 text-center">NỘI DUNG</th>
                <th className="py-4 px-6 text-center">GIÁ DỊCH VỤ</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {serviceData.map((service, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">{index + 1}</td>
                  <td className="py-4 px-6 text-center">{service.serviceName}</td>
                  <td className="py-4 px-6 text-left" dangerouslySetInnerHTML={{ __html: service.serviceDescription }}></td>
                  <td className="py-4 px-6 text-right pr-12">{formatPrice(service.servicePrice)} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white bg-opacity-90 p-12 rounded-lg shadow-lg w-full max-w-6xl mt-12">
        <p className="text-2xl font-bold mb-8 text-center text-gray-800">
          TIÊU CHUẨN GIÁM ĐỊNH KIM CƯƠNG PNJLAB
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-center">STT</th>
                <th className="py-4 px-6 text-center">TIÊU CHUẨN GIÁM ĐỊNH</th>
                <th className="py-4 px-6 text-center">NỘI DUNG</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {standardData.map((standard, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-6 text-center">{standard.standardId}</td>
                  <td className="py-4 px-6 text-center">{standard.standardName}</td>
                  <td className="py-4 px-6 text-left" dangerouslySetInnerHTML={{ __html: standard.description }}></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

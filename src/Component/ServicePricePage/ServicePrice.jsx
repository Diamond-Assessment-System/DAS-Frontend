import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";
import "./Service.css";
import ContactModal from "../contact/ContactModal"; // Đảm bảo đường dẫn đến ContactModal là chính xác

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const EvaluateServicePrice = () => {
    const [serviceData, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const response = await axios.get(`https://das-backend.fly.dev/api/service-price-lists`);
            setServices(response.data);
          } catch (error) {
            console.error("Error fetching the services:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchServices();
      }, []);
    
      if (loading) {
        return (
          <div className="loading-indicator">
            <Spinner />
          </div>
        );
      }

    return (
      <div className="evaluate-service" style={{ marginTop: '8rem' }}>
        <ContactModal/>
      <div className="section">
        <p className="headerService">GIÁ DỊCH VỤ GIÁM ĐỊNH TẠI DAS THEO KÍCH THƯỚC MẪU</p>
        <div className="table-container">
          <table className="service-table" style={{width: "50%"}}>
            <thead>
              <tr>
                <th>STT</th>
                <th>VÙNG KÍCH THƯỚC</th>
                <th>GIÁ CƠ BẢN</th>
                <th>GIÁ TĂNG THÊM</th>
              </tr>
            </thead>
            <tbody>
              {serviceData.map((service, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{service.sizeFrom} mm → {service.sizeTo} mm</td>
                  <td style={{ textAlign: "right", paddingRight: "10px", width: "200px"}}>
                    {formatPrice(service.initPrice)} VND
                  </td>
                  <td style={{ textAlign: "right", paddingRight: "10px", width: "200px"}}>
                    {formatPrice(service.priceUnit)} VND
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

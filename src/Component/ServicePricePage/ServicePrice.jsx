import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import ContactModal from "../contact/ContactModal"; // Ensure the path to ContactModal is correct
import backgroundImage from "../../assets/backgroundcus.png"; // Ensure the path to your background image is correct

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
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})`, marginTop:'10rem'}}
    >
      <ContactModal />
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <p className="text-2xl font-bold mb-4 text-center text-gray-800">
          GIÁ DỊCH VỤ GIÁM ĐỊNH TẠI DAS THEO KÍCH THƯỚC MẪU
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center">STT</th>
                <th className="py-4 px-4 text-center">VÙNG KÍCH THƯỚC</th>
                <th className="py-4 px-4 text-center">GIÁ CƠ BẢN</th>
                <th className="py-4 px-4 text-center">GIÁ TĂNG THÊM</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {serviceData.map((service, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{index + 1}</td>
                  <td className="py-4 px-4 text-center">{service.sizeFrom} mm → {service.sizeTo} mm</td>
                  <td className="py-4 px-4 text-right pr-10">{formatPrice(service.initPrice)} VND</td>
                  <td className="py-4 px-4 text-right pr-10">{formatPrice(service.priceUnit)} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

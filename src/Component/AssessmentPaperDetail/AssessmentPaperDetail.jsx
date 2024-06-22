import React, { useState, useEffect } from "react";
import "./AssessmentRequestDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getServiceFromId from "../../utils/getServiceFromId";

const AssessmentRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/assessment-bookings/${id}`
        );
        setBooking(response.data);
        const serviceData = await getServiceFromId(response.data.serviceId);
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching the booking:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Chi tiết đặt hẹn giám định</h2>
      <p className="text-xl mb-2">
        Mã đặt hẹn: <span className="font-semibold">#{booking.bookingId}</span>
      </p>
      <p className="text-xl mb-2">
        Số điện thoại: <span className="font-semibold">{booking.phone}</span>
      </p>
      <p className="text-xl mb-2">
        Dịch vụ: <span className="font-semibold">{service.serviceName}</span>
      </p>
      <p className="text-xl mb-2">
        Số lượng: <span className="font-semibold">{booking.quantities}</span>
      </p>
      <p className="text-xl mb-2">
        Ngày tạo: <span className="font-semibold">{booking.dateCreated}</span>
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
        onClick={() =>
          navigate(`/consultingstaff/assessmentrequest/${id}/inputdiamonds`, {
            state: {
              bookingData: booking,
              serviceData: service,
              numberOfSamples: booking.quantities,
              id,
            },
          })
        }
      >
        Đặt Hẹn
      </button>
    </div>
  );
};

export default AssessmentRequestDetail;

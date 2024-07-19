import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import getServiceFromId from '../../utils/getServiceFromId';
import Spinner from "../Spinner/Spinner";
import { getAssessmentDetailUrl } from "../../utils/apiEndPoints";

const AssessmentRequestDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(getAssessmentDetailUrl(id));
        setBooking(response.data);
        const serviceData = await getServiceFromId(response.data.serviceId);
        setService(serviceData);
      } catch (error) {
        console.error("Error fetching the booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleBookingClick = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt hẹn cho yêu cầu này không?")) {
      navigate(`/consultingstaff/assessmentrequest/${id}/inputdiamonds`, { state: { bookingData: booking, serviceData: service, numberOfSamples: booking.quantities, id } });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6">Chi tiết đặt hẹn giám định</h2>
        <div className="space-y-4">
          <p className="text-lg"><strong>Mã đặt hẹn:</strong> #{booking.bookingId}</p>
          <p className="text-lg"><strong>Số điện thoại:</strong> {booking.phone}</p>
          <p className="text-lg"><strong>Dịch vụ:</strong> {service.serviceName}</p>
          <p className="text-lg"><strong>Số lượng:</strong> {booking.quantities}</p>
          <p className="text-lg"><strong>Ngày tạo:</strong> {booking.dateCreated}</p>
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
          onClick={handleBookingClick}
        >
          Đặt Hẹn
        </button>
      </div>
    </div>
  );
}

export default AssessmentRequestDetail;

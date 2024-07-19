import React, { useState, useEffect } from 'react';
import '../AssessmentRequestDetail/AssessmentRequestDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import getServiceFromId from '../../utils/getServiceFromId';
import Spinner from "../Spinner/Spinner";
import { getAssessmentDetailUrl } from "../../utils/apiEndPoints";

const SealDiamonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [service, setService] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        //const response = await axios.get(`https://das-backend.fly.dev/api/assessment-bookings/${id}`);
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
      navigate(`/consultingstaff/sealdiamond/${id}/sealinput`, { state: { bookingData: booking, serviceData: service, numberOfSamples: booking.quantities, id } });
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className='text-2xl font-bold mb-4'>Chi tiết niêm phong</h2>
      <p className='text-xl mb-2'>Mã đặt hẹn: <span className='font-semibold'>#{booking.bookingId}</span></p>
      <p className='text-xl mb-2'>Số điện thoại: <span className='font-semibold'>{booking.phone}</span></p>
      <p className='text-xl mb-2'>Dịch vụ: <span className='font-semibold'>{service.serviceName}</span></p>
      <p className='text-xl mb-2'>Số lượng: <span className='font-semibold'>{booking.quantities}</span></p>
      <p className='text-xl mb-2'>Ngày tạo: <span className='font-semibold'>{booking.dateCreated}</span></p>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150'
        onClick={handleBookingClick}
      >
        Niêm Phong
      </button>
    </div>
  );
}

export default SealDiamonDetail;

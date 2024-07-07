import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";
import Spinner from "../Spinner/Spinner";
import { ASSESSMENT_BOOKING_URL } from "../../utils/apiEndPoints";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import getServiceFromId from "../../utils/getServiceFromId"; // Adjust the import path if necessary

function AssessmentReceipt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-green-500";
      case 3:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(ASSESSMENT_BOOKING_URL);
        const filteredBookings = response.data.filter(
          (booking) => booking.status === 2 || booking.status === 3
        );

        // Fetch service names for each booking
        const bookingsWithServiceNames = await Promise.all(
          filteredBookings.map(async (booking) => {
            const service = await getServiceFromId(booking.serviceId);
            return { ...booking, serviceName: service.serviceName };
          })
        );

        setBookings(bookingsWithServiceNames);
      } catch (error) {
        console.error("Error fetching the bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Danh Sách Đặt Hẹn
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center">Mã yêu cầu</th>
                <th className="py-4 px-4 text-center">Dịch vụ</th>
                <th className="py-4 px-4 text-center">Số Lượng Kim Cương</th>
                <th className="py-4 px-4 text-center">Ngày tạo</th>
                <th className="py-4 px-4 text-center">Trạng Thái</th>
                <th className="py-4 px-4 text-center">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{`#${booking.bookingId}`}</td>
                  <td className="py-4 px-4 text-center">
                    {booking.serviceName}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {booking.quantities}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {booking.dateCreated}
                  </td>
                  <td
                    className={`py-4 px-4 text-center ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {getBookingStatusMeaning(booking.status)}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/consultingstaff/receipt/${booking.bookingId}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Xem biên nhận
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssessmentReceipt;

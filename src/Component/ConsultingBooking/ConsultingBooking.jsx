import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../ConsultingBooking/ConsultingBooking.css";
function ConsultingBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assessmentbookings"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching the bookings:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  return (
    <div className="booking-container">
      <div className="step text-4xl font-bold">
        <h4> Danh Sách Đơn Giám Định </h4>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              {/* <th>Loại dịch vụ</th> */}
              <th>Số Lượng Kim Cương</th>
              <th>Ngày tạo</th>
              <th>Trạng Thái</th>
              <th>Chi Tiết</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingId}>
                <td>#{booking.bookingId}</td>
                {/* <td>{booking.serviceType}</td> */}
                <td>{booking.quantity}</td>
                <td>{booking.dateCreated}</td>
                <td>{booking.status}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(
                        `/assessmentstaff/assessmentbooking/${booking.bookingId}`
                      )
                    }
                  >
                    Xem Chi Tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConsultingBooking;

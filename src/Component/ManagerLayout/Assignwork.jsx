import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";

function AssignWork() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [selectedActions, setSelectedActions] = useState({});

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

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Đang chờ";
      case 2:
        return "Đã tạo booking";
      case 3:
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getServiceText = (service) => {
    switch (service) {
      case 1:
        return "Giám định kim cương";
      case 2:
        return "Niêm phong kim cương";
      case 3:
        return "Cấp lại giấy giám định";
      default:
        return "Không xác định";
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/assessment-bookings"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching the bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleSelectChange = (e, bookingId) => {
    const selectedAction = e.target.value;
    setSelectedActions((prevState) => ({
      ...prevState,
      [bookingId]: selectedAction,
    }));
  };

  const handleSubmit = (bookingId) => {
    const selectedAction = selectedActions[bookingId];
    if (selectedAction === "viewDetails") {
      navigate(`/consultingstaff/assessmentrequest/${bookingId}`);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`https://das-backend.fly.dev/api/assessment-bookings/${bookingId}/cancel`);
      setBookings(bookings.map((booking) =>
        booking.bookingId === bookingId ? { ...booking, status: 3 } : booking
      ));
    } catch (error) {
      console.error("Error cancelling the booking:", error);
    }
  };

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
                <th className="py-4 px-4 text-center align-middle">Mã yêu cầu</th>
                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-center align-middle">
                  Số Lượng Kim Cương
                </th>
                <th className="py-4 px-4 text-center align-middle">Ngày tạo</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
                <th className="py-4 px-4 text-center align-middle">Hủy</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {bookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center align-middle">{`#${booking.bookingId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    {getServiceText(booking.serviceId)}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {booking.quantities}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {booking.dateCreated}
                  </td>
                  <td
                    className={`py-4 px-4 text-center align-middle ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <div className="flex items-center justify-center">
                      <select
                        onChange={(e) => handleSelectChange(e, booking.bookingId)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        value={selectedActions[booking.bookingId] || ""}
                      >
                        <option value="" disabled hidden>Select action</option>
                        <option value="viewDetails">Xem chi tiết</option>
                      </select>
                      <button
                        onClick={() => handleSubmit(booking.bookingId)}
                        className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => handleCancel(booking.bookingId)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Hủy
                    </button>
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

export default AssignWork;

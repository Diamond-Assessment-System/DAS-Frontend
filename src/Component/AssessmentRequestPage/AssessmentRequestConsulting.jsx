import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";

function AssessmentRequestConsulting() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("tatca");

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

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus === "tatca") return true;
    if (selectedStatus === "dangcho") return booking.status === 1;
    if (selectedStatus === "datao") return booking.status === 2;
    if (selectedStatus === "dahoantat") return booking.status === 3;
    if (selectedStatus === "dahuy") return booking.status === 4;
    return false;
  });

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Danh Sách Đặt Hẹn
        </h4>
        <div className="radio-group">
          <input
            type="radio"
            id="status1"
            name="status"
            value="tatca"
            checked={selectedStatus === "tatca"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status1">Tất Cả</label>
          <input
            type="radio"
            id="status2"
            name="status"
            value="dangcho"
            checked={selectedStatus === "dangcho"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status2">Đang Chờ</label>
          <input
            type="radio"
            id="status3"
            name="status"
            value="datao"
            checked={selectedStatus === "datao"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status3"> Đã Tạo </label>
          <input
            type="radio"
            id="status4"
            name="status"
            value="dahoantat"
            checked={selectedStatus === "dahoantat"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status4">Đã Hoàn Tất</label>
          <input
            type="radio"
            id="status5"
            name="status"
            value="dahuy"
            checked={selectedStatus === "dahuy"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status5"> Đã Huỷ</label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-left align-middle">Mã yêu cầu</th>
                <th className="py-4 px-4 text-left align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-left align-middle">
                  Số Lượng Kim Cương
                </th>
                <th className="py-4 px-4 text-left align-middle">Ngày tạo</th>
                <th className="py-4 px-4 text-left align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-left align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 align-middle">{`#${booking.bookingId}`}</td>
                  <td className="py-4 px-4 align-middle">
                    {getServiceText(booking.serviceId)}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {booking.quantities}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {booking.dateCreated}
                  </td>
                  <td
                    className={`py-4 px-4 align-middle ${getStatusClass(
                      booking.status
                    )}`}
                  >
                    {getStatusText(booking.status)}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          navigate(
                            `/consultingstaff/assessmentrequest/${booking.bookingId}`
                          )
                        }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={booking.status !== 1}
                      >
                        Tạo Booking
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

export default AssessmentRequestConsulting;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Paginate/Pagination"; 

function AssessmentRequestConsulting() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("tatca");
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "status-pending";
      case 2:
        return "status-completedd";
      case 3:
        return "status-canceled";
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
          "https://das-backend.fly.dev/api/assessment-bookings/ordered"
        );
        setBookings(response.data);
        setFilteredBookings(response.data);
      } catch (error) {
        console.error("Error fetching the bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredBookings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredBookings.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredBookings]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredBookings.length;
    setItemOffset(newOffset);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    const status = e.target.value;
    let filteredData = bookings;

    if (status !== "tatca") {
      filteredData = bookings.filter((booking) => {
        if (status === "dangcho") return booking.status === 1;
        if (status === "datao") return booking.status === 2;
        if (status === "dahoantat") return booking.status === 3;
        if (status === "dahuy") return booking.status === 4;
        return false;
      });
    }

    setFilteredBookings(filteredData);
    setItemOffset(0); // Reset to first page when filters change
  };

  const handleCreateBooking = (booking) => {
    switch (booking.status) {
      case 2:
        alert("Yêu cầu này đã được tạo booking rồi, không thể tạo lại.");
        break;
      case 3:
        alert("Yêu cầu đã hoàn tất rồi, không thể tạo lại!");
        break;
      case 4:
        alert("Yêu cầu đã bị hủy!");
        break;
      default:
        navigate(`/consultingstaff/assessmentrequest/${booking.bookingId}`);
        break;
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
                <th className="py-4 px-4 text-center align-middle">Mã yêu cầu</th>
                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-center align-middle">
                  Số Lượng Kim Cương
                </th>
                <th className="py-4 px-4 text-center align-middle">Ngày tạo</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((booking) => (
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
                  <td className={`py-4 px-4 align-middle ${getStatusClass(booking.status)}`}>
                    <h3>{getStatusText(booking.status)}</h3>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleCreateBooking(booking)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
}

export default AssessmentRequestConsulting;

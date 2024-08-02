import axios from "axios";
import { useState, useEffect } from "react";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Paginate/Pagination"; 

function SuccessBooking() {
  const [bookings, setBookings] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

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
        return "Đang Hoàn Thành";
      case 2:
        return "Đã Hoàn Thành";
      case 3:
        return "Đã Huỷ";
      default:
        return "Không Xác Định";
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
        return "Không Xác Định";
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/assessment-bookings");
      setBookings(response.data.filter((booking) => booking.status === 1));
    } catch (error) {
      console.error("Error fetching the bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(bookings.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(bookings.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, bookings]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bookings.length;
    setItemOffset(newOffset);
  };

  const handleCompleteBooking = async (booking) => {
    if (window.confirm("Bạn có chắc chắn muốn hoàn thành yêu cầu này không?")) {
      try {
        await axios.put(
          `http://localhost:8080/api/assessment-bookings/${booking.bookingId}`,
          { status: 2 }
        );

        const updatedBookings = bookings.filter((b) => b.bookingId !== booking.bookingId);
        setBookings(updatedBookings);
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(updatedBookings.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(updatedBookings.length / itemsPerPage));
      } catch (error) {
        console.error("Error updating the booking status:", error);
      }
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
          Danh Sách Đặt Hẹn Đang Chờ
        </h4>

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
                        onClick={() => handleCompleteBooking(booking)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Hoàn Thành
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

export default SuccessBooking;

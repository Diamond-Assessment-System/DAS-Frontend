import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../AssessmentPaperReprinted/ReprintedBooking.css";
import Spinner from "../Spinner/Spinner";
import getAllBookings from "../../utils/getAllBookingsForConsulting"; // Import the getAllBookings function
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import { getAllServices } from "../../utils/getAllServices"; // Import the getAllServices function

function SealDiamondPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("tatca");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    const fetchBookingsAndServices = async () => {
      try {
        const allBookings = await getAllBookings(); // Fetch all bookings
        const allServices = await getAllServices(); // Fetch all services
        console.log("All Bookings:", allBookings); // Debug: Check if data is fetched
        console.log("All Services:", allServices); // Debug: Check if data is fetched

        // Filter bookings to only include those with serviceType = 2
        const filteredBookings = allBookings.filter((booking) => {
          const service = allServices.find(
            (service) => service.serviceId === booking.serviceId
          );
          return service && service.serviceType === 2;
        });
        console.log("Filtered Bookings:", filteredBookings); // Debug: Check filtered data

        setBookings(filteredBookings);
        setServices(allServices);
      } catch (error) {
        console.error("Error fetching the bookings or services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsAndServices();
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Reset to the first page when the status changes
  };

  const handleCreateBooking = (booking) => {
    navigate(`/consultingstaff/sealdiamond/${booking.bookingId}`); // Added bookingId to the URL path
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredBookings = bookings
    .filter((booking) => {
      const matchesSearchQuery = removeDiacritics(
        booking.bookingId.toString().toLowerCase()
      ).includes(removeDiacritics(searchQuery.toLowerCase()));
      const matchesStatus =
        selectedStatus === "tatca" || booking.status.toString() === selectedStatus;

      return matchesSearchQuery && matchesStatus;
    });

  // Sort bookings by status
  const sortedBookings = filteredBookings.sort((a, b) => a.status - b.status);

  // Calculate the indices for the current page
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Niêm Phong</h4>
        <input
          type="text"
          placeholder="Search by booking ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
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
            value="1"
            checked={selectedStatus === "1"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status2">Đang Chờ</label>
          <input
            type="radio"
            id="status3"
            name="status"
            value="2"
            checked={selectedStatus === "2"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status3"> Đã Tạo </label>
          <input
            type="radio"
            id="status4"
            name="status"
            value="3"
            checked={selectedStatus === "3"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status4">Đã Hoàn Tất</label>
          <input
            type="radio"
            id="status5"
            name="status"
            value="4"
            checked={selectedStatus === "4"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status5"> Đã Đóng</label>
          <input
            type="radio"
            id="status6"
            name="status"
            value="5"
            checked={selectedStatus === "5"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status6"> Đã Niêm Phong</label>
          <input
            type="radio"
            id="status7"
            name="status"
            value="6"
            checked={selectedStatus === "6"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status7"> Đã Huỷ</label>
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
              {currentBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 align-middle">{`#${booking.bookingId}`}</td>
                  <td className="py-4 px-4 align-middle">
                    {booking.serviceName}
                  </td>
                  <td className="py-4 px-4 align-middle">{booking.quantities}</td>
                  <td className="py-4 px-4 align-middle">{booking.dateCreated}</td>
                  <td className="py-4 px-4 align-middle">
                    {getBookingStatusMeaning(booking.status)}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleCreateBooking(booking)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Tạo đơn niêm phong
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Trang Trước
          </button>
          <div>
            Trang {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Trang Sau
          </button>
        </div>
      </div>
    </div>
  );
}

export default SealDiamondPage;

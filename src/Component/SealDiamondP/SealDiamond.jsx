import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { ASSESSMENT_REQUEST_URL, SERVICES_URL } from "../../utils/apiEndPoints";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";

function SealDiamond() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("tatca");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "status-pending";
      case 2:
        return "status-complete-booking";
      case 3:
        return "status-completed";
      case 4:
        return "status-canceled";
      default:
        return "text-gray-500";
    }
  };

  useEffect(() => {
    const fetchBookingsAndServices = async () => {
      try {
        const bookingsResponse = await axios.get(ASSESSMENT_REQUEST_URL);
        const servicesResponse = await axios.get(SERVICES_URL);

        setBookings(bookingsResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching the bookings or services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsAndServices();
  }, []);

  const handleCreateBooking = (booking) => {
    navigate(`/consultingstaff/sealdiamond/${booking.bookingId}`);
  };

  const getServiceName = (serviceId) => {
    const service = services.find((service) => service.serviceId === serviceId);
    return service ? service.serviceName : "Không xác định";
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredBookings = bookings
    .filter((booking) => {
      const service = services.find(
        (service) => service.serviceId === booking.serviceId
      );
      return service && service.serviceType === 2;
    })
    .filter((booking) => {
      const matchesSearchQuery = removeDiacritics(booking.bookingId.toString().toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === "tatca" || booking.status.toString() === selectedStatus;

      return matchesSearchQuery && matchesStatus;
    });

  // Calculate the indices for the current page
  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(
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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Niêm Phong
        </h4>
        <input
          type="text"
          placeholder="Search by booking ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">
                  Mã yêu cầu
                </th>
                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-center align-middle">
                  Số Lượng Kim Cương
                </th>
                <th className="py-4 px-4 text-center align-middle">Ngày tạo</th>
                <th className="py-4 px-4 text-center align-middle">
                  Trạng Thái
                </th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentBookings.map((booking) => (
                <tr key={booking.bookingId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 align-middle">{`#${booking.bookingId}`}</td>
                  <td className="py-4 px-4 align-middle">
                    {getServiceName(booking.serviceId)}
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

export default SealDiamond;

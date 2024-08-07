import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../AssessmentRequestPage/AssessmentRequestConsulting.css";
import Spinner from "../Spinner/Spinner";
import { ASSESSMENT_REQUEST_URL, SERVICES_URL } from "../../utils/apiEndPoints";
import { changeBookingStatus } from "../../utils/changeBookingStatus";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import { Modal, Button, Form } from "react-bootstrap"; 
import { toast, ToastContainer } from 'react-toastify'; 

function AssessmentRequestConsulting() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("tatca");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

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
    const fetchBookingsServicesAccounts = async () => {
      try {
        const bookingsResponse = await axios.get(ASSESSMENT_REQUEST_URL);
        const servicesResponse = await axios.get(SERVICES_URL);
        const accountsResponse = await axios.get(`https://das-backend.fly.dev/api/accounts`);

        setBookings(bookingsResponse.data);
        setServices(servicesResponse.data);
        setAccounts(accountsResponse.data);
      } catch (error) {
        console.error("Error fetching the bookings, services, or accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsServicesAccounts();
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1); // Reset to the first page when the status changes
  };

  const handleCreateBooking = async (booking) => {
    if (booking.status === 6 || booking.status === 3 || booking.status === 4 || booking.status === 5) {
      alert("Không thể tạo booking mới cho yêu cầu này.");
      return;
    }
    if (booking.status === 2) {
      try {
        // Update the booking status to 'Đã Hoàn Thành' (status 3) using the new API
        await changeBookingStatus(booking.bookingId, 3);
        // Update the booking status locally
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.bookingId === booking.bookingId ? { ...b, status: 3 } : b
          )
        );
        alert("Đã cập nhật trạng thái booking thành 'Đã Hoàn Thành'.");
      } catch (error) {
        console.error("Error updating the booking status:", error);
      }
    } else {
      navigate(`/consultingstaff/assessmentrequest/${booking.bookingId}`);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!cancelReason.trim()) {
      alert("Lý do hủy không được để trống");
      return;
    }

    try {
      // Update the booking status to 'Đã Hủy' (status 6) using the new API
      await changeBookingStatus(bookingId, 6, cancelReason);
      // Update the booking status locally
      setBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.bookingId === bookingId ? { ...b, status: 6, cancelReason: cancelReason } : b
        )
      );
      toast.success("Đã cập nhật trạng thái booking thành 'Đã Hủy'.");
    } catch (error) {
      console.error("Error updating the booking status:", error);
    } finally {
      setShowModal(false);
      setCancelReason("");
    }
  };

  const openCancelModal = (bookingId) => {
    const booking = bookings.find((b) => b.bookingId === bookingId);
    if (booking.status === 1) {
      setCancelReason(booking.cancelReason || "");
      setCancelBookingId(bookingId);
      setShowModal(true);
    } else if (booking.status === 3 || booking.status === 4) {
      window.alert("Không Thể Hủy Booking Khi Đã Hoàn Thành/Đã Hủy");
      return;
    } else {
      setCancelReason("");
      setCancelBookingId(bookingId);
      setShowModal(true);
    }
  };

  const getServiceName = (serviceId) => {
    const service = services.find((service) => service.serviceId === serviceId);
    return service ? service.serviceName : "Không xác định";
  };

  const getBackgroundColor = (dateCreated, status) => {
    if (status === 1) {
      const dateFormat = 'YYYY/MM/DD - HH:mm:ss';
      const parsedDate = moment(dateCreated, dateFormat);

      if (!parsedDate.isValid()) {
        console.error("Invalid date format:", dateCreated);
        return "";
      }
      const dateDiff = moment().diff(parsedDate, 'days');
      if (dateDiff > 5) return "bg-red-500";
      if (dateDiff > 3) return "bg-yellow-500";
    }
    return "";
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredBookings = bookings
    .filter((booking) => {
      const service = services.find(
        (service) => service.serviceId === booking.serviceId
      );
      return service && service.serviceType === 1;
    })
    .filter((booking) => {
      const account = accounts.find((account) => account.accountId === booking.accountId);
      const accountInfo = `${account?.phone || ""} ${account?.email || ""}`;
      const matchesSearchQuery = removeDiacritics(accountInfo.toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase()));
      const matchesStatus = selectedStatus === "tatca" || booking.status.toString() === selectedStatus;

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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Danh Sách Đặt Hẹn
        </h4>
        <input
          type="text"
          placeholder="Search by phone or email"
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
                <th className="py-4 px-4 text-center align-middle">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentBookings.map((booking) => (
                <tr key={booking.bookingId} className={`hover:bg-gray-100 ${getBackgroundColor(booking.dateCreated, booking.status)}`}>
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
                    <h3>{getBookingStatusMeaning(booking.status)}</h3>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {booking.status !== 4 && (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleCreateBooking(booking)}
                          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                            booking.status === 3
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={booking.status === 3}
                        >
                          {booking.status === 2 ? "Hoàn Thành" : "Tạo Booking"}
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    {booking.status !== 4 && (
                      <div className="flex items-center justify-center space-x-2">
                        {booking.status === 1 && (
                          <button
                            onClick={() => openCancelModal(booking.bookingId)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={
                              booking.status === 2 || booking.status === 3
                            }
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    )}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy Yêu Cầu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cancelReason">
              <Form.Label>Lý do hủy</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="outline-primary" onClick={() => handleCancelBooking(cancelBookingId)}>
            Hủy Yêu Cầu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssessmentRequestConsulting;

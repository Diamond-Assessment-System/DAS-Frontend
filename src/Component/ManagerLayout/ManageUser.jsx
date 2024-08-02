import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import getAllAccounts from "../../utils/getAllAccounts"; // Adjust path as needed
import getBookingFromAccountId from "../../utils/getBookingFromAccountId"; // Adjust path as needed
import { getAccountStatusMeaning, getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [samples, setSamples] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      const accounts = await getAllAccounts();
      const filteredAccounts = accounts.filter(account => account.role === 1);
      setUsers(filteredAccounts);
      setFilteredUsers(filteredAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (accountId) => {
    try {
      setLoading(true);
      const bookings = await getBookingFromAccountId(accountId);
      setBookings(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSamplesByBookingId = async (bookingId) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://das-backend.fly.dev/api/booking-samples/booking/${bookingId}`);
      setSamples(response.data);
      setShowSampleModal(true);
    } catch (error) {
      console.error("Error fetching samples:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewBookings = async (user) => {
    setSelectedUser(user);
    await fetchBookings(user.accountId);
    setShowModal(true);
  };

  const handleViewSamples = async (bookingId) => {
    await fetchSamplesByBookingId(bookingId);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseSampleModal = () => setShowSampleModal(false);

  const getStatusClass = (status) => {
    switch (status) {
      case 1:
        return "bg-yellow-100 text-yellow-800";
      case 2:
        return "bg-blue-100 text-blue-800";
      case 3:
        return "bg-green-100 text-green-800";
      case 4:
        return "bg-gray-100 text-gray-800";
      case 5:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " VND" : "Chưa xác nhận đơn";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d) ? d.toLocaleString() : "Invalid Date";
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();
    const newFilteredUsers = users.filter(user =>
      user.displayName.toLowerCase().includes(normalizedSearchQuery) ||
      user.phone?.toLowerCase().includes(normalizedSearchQuery)
    );
    setFilteredUsers(newFilteredUsers);
  }, [searchQuery, users]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Danh Sách Tài Khoản
        </h2>
        <input
          type="text"
          placeholder="Search by name or phone number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã Khách Hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên Khách Hàng</th>
                <th className="py-4 px-4 text-center align-middle">Email</th>
                <th className="py-4 px-4 text-center align-middle">Số Điện Thoại</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentUsers.map((user) => (
                <tr key={user.accountId} className={`hover:bg-gray-100 ${user.accountStatus === 2 ? "bg-red-100" : (user.accountStatus === 1 ? "bg-green-100" : "")}`}>
                  <td className="py-4 px-4 text-center align-middle">{user.accountId}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.displayName}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.email || "No Email"}</td>
                  <td className="py-4 px-4 text-center align-middle">{user.phone || "No Phone"}</td>
                  <td className="py-4 px-4 text-center align-middle">{getAccountStatusMeaning(user.accountStatus)}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => handleViewBookings(user)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Chi tiết đơn hàng
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination>
            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
              <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
                {number + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>Đơn hàng của {selectedUser?.displayName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {bookings.length === 0 ? (
              <p>Danh sách đặt hẹn trống</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-4 px-6 text-center">Mã đơn hàng</th>
                      <th className="py-4 px-6 text-center">Ngày đặt đơn</th>
                      <th className="py-4 px-6 text-center">Ngày trả đơn</th>
                      <th className="py-4 px-6 text-center">Số lượng mẫu</th>
                      <th className="py-4 px-6 text-center">Tổng giá trị</th>
                      <th className="py-4 px-6 text-center">Trạng Thái</th>
                      <th className="py-4 px-6 text-center">Đánh giá</th>
                      <th className="py-4 px-6 text-center">Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {bookings.map((booking) => (
                      <tr key={booking.bookingId} className={`hover:bg-gray-100 ${getStatusClass(booking.status)}`}>
                        <td className="py-4 px-6 text-center align-middle">{booking.bookingId}</td>
                        <td className="py-4 px-6 text-center align-middle">{booking.dateCreated}</td>
                        <td className="py-4 px-6 text-center align-middle">{booking.sampleReturnDate}</td>
                        <td className="py-4 px-6 text-center align-middle">{booking.quantities}</td>
                        <td className="py-4 px-6 text-center align-middle">{formatPrice(booking.totalPrice)}</td>
                        <td className="py-4 px-6 text-center align-middle">{getSampleStatusMeaning(booking.status)}</td>
                        <td className="py-4 px-6 text-center align-middle">{booking.feedback || "No Feedback"}</td>
                        <td className="py-4 px-6 text-center align-middle">
                          <button
                            onClick={() => handleViewSamples(booking.bookingId)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showSampleModal} onHide={handleCloseSampleModal} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Mẫu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {samples.length === 0 ? (
              <p>No samples found for this booking.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="py-4 px-6 text-center">Mã mẫu</th>
                      <th className="py-4 px-6 text-center">Tên mẫu</th>
                      <th className="py-4 px-6 text-center">Kích cỡ</th>
                      <th className="py-4 px-6 text-center">Giá</th>
                      <th className="py-4 px-6 text-center">Trạng Thái</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {samples.map((sample) => (
                      <tr key={sample.sampleId} className="hover:bg-gray-100">
                        <td className="py-4 px-6 text-center align-middle">{sample.sampleId}</td>
                        <td className="py-4 px-6 text-center align-middle">{sample.name}</td>
                        <td className="py-4 px-6 text-center align-middle">{sample.size}</td>
                        <td className="py-4 px-6 text-center align-middle">{formatPrice(sample.price)}</td>
                        <td className={`py-4 px-6 text-center align-middle ${getStatusClass(sample.status)}`}>
                          {getSampleStatusMeaning(sample.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSampleModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageUser;

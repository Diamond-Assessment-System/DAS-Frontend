import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getAllBookings from "../../utils/getAllBookingsForManager";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import { changeSampleStatus } from "../../utils/changeSampleStatus"; // Import the function to change sample status
import { countAllBookingSamplesByBookingId, countBookingSamplesByBookingIdWithStatus1or2, countBookingSamplesByBookingIdWithStatus4 } from "../../utils/countBookingSamples";

function ManagerHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("tatca");
  const [sampleCounts, setSampleCounts] = useState({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingHistory = await getAllBookings();
        console.log("Booking History:", bookingHistory);
        setOrders(bookingHistory);

        // Fetch sample counts for each booking
        const sampleCountsData = {};
        for (const order of bookingHistory) {
          const allSamplesCount = await countAllBookingSamplesByBookingId(order.bookingId);
          const status1or2SamplesCount = await countBookingSamplesByBookingIdWithStatus4(order.bookingId);
          sampleCountsData[order.bookingId] = {
            allSamplesCount,
            status1or2SamplesCount,
          };
        }
        console.log("Sample Counts Data:", sampleCountsData);
        setSampleCounts(sampleCountsData);
      } catch (error) {
        console.error("Error fetching booking history or sample counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const viewDetails = (bookingId) => {
    navigate(`/manager/sealing-records`, { state: { bookingId } });
  };

  const completeOrder = async (bookingId) => {
    try {
      // Change the order status to "Đã Hoàn Thành"
      await changeSampleStatus(bookingId, 3);
      window.location.reload(); // Reload the page to refresh the status
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const createCommitmentPaper = (bookingId) => {
    navigate(`/manager/commitment-paper`, { state: { bookingId } });
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearchQuery =
      removeDiacritics(order.accountName.toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase())) ||
      order.bookingId.toString().toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "tatca" || order.status.toString() === selectedStatus;

    return matchesSearchQuery && matchesStatus;
  });

  // Calculate the indices for the current page
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Lịch Sử Đơn Hàng</h4>
        <input
          type="text"
          placeholder="Search by customer name or booking ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="radio-group mb-4">
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
          <label htmlFor="status2">Đã tạo</label>
          <input
            type="radio"
            id="status3"
            name="status"
            value="2"
            checked={selectedStatus === "2"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status3">Đã nhận</label>
          <input
            type="radio"
            id="status4"
            name="status"
            value="3"
            checked={selectedStatus === "3"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status4">Đã Hoàn Thành</label>
          <input
            type="radio"
            id="status5"
            name="status"
            value="4"
            checked={selectedStatus === "4"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status5">Đã Seal</label>
          <input
            type="radio"
            id="status6"
            name="status"
            value="5"
            checked={selectedStatus === "5"}
            onChange={handleStatusChange}
          />
          <label htmlFor="status6">Đã Hủy</label>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-center align-middle">Thời gian nhận</th>
                <th className="py-4 px-4 text-center align-middle">Thời gian trả hàng</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Số lượng</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentOrders.map((order) => (
                <tr key={order.bookingId}>
                  <td className="py-4 px-4 text-center align-middle">{order.bookingId}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.accountName}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.serviceName}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.dateCreated}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.dateReceived}</td>
                  <td className="py-4 px-4 text-center align-middle">{getBookingStatusMeaning(order.status)}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    {sampleCounts[order.bookingId]
                      ? `${sampleCounts[order.bookingId].status1or2SamplesCount} / ${sampleCounts[order.bookingId].allSamplesCount}`
                      : "Loading..."}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {order.status === 2 && (
                      <button
                        onClick={() => completeOrder(order.bookingId)}
                        className="btn-small bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Hoàn Thành
                      </button>
                    )}
                    {order.status === 3 && (
                      <div className="btn-container">
                        <button
                          onClick={() => viewDetails(order.bookingId)}
                          className="btn-small bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                        >
                          Niêm Phong
                        </button>
                        <button
                          onClick={() => createCommitmentPaper(order.bookingId)}
                          className="btn-small bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Biên Nhận
                        </button>
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
    </div>
  );
}

export default ManagerHistory;

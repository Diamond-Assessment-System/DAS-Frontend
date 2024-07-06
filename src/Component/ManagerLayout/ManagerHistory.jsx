import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getAllBookings from "../../utils/getAllBookingsForManager";

function ManagerHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingHistory = await getAllBookings();
        setOrders(bookingHistory);
      } catch (error) {
        console.error("Error fetching booking history:", error);
      }
    };

    fetchData();
  }, []);

  const viewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const filteredOrders = orders.filter(order =>
    removeDiacritics(order.accountName.toLowerCase()).includes(removeDiacritics(searchQuery.toLowerCase())) ||
    order.bookingId.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                <th className="py-4 px-4 text-center align-middle">Thời gian nhận</th>
                <th className="py-4 px-4 text-center align-middle">Thời gian trả hàng</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.bookingId}>
                  <td className="py-4 px-4 text-center align-middle">{`#${order.bookingId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.accountName}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.serviceName}</td>
                  <td className="py-4 px-4 text-center align-middle">{new Date(order.dateCreated).toLocaleString()}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.dateReceived ? new Date(order.dateReceived).toLocaleString() : 'N/A'}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => viewDetails(order.bookingId)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Xem chi tiết
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

export default ManagerHistory;

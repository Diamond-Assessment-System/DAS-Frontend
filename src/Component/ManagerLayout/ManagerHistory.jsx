import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManagerHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const dummyOrders = [
      {
        orderId: "12345",
        customerName: "John Doe",
        service: "Dry Cleaning",
        receiptTime: "2023-06-28T14:30:00Z",
        deliveryTime: "2023-06-29T14:30:00Z",
      },
      {
        orderId: "12346",
        customerName: "Jane Smith",
        service: "Laundry",
        receiptTime: "2023-06-27T10:00:00Z",
        deliveryTime: "2023-06-28T10:00:00Z",
      },
      {
        orderId: "12347",
        customerName: "Alice Johnson",
        service: "Ironing",
        receiptTime: "2023-06-26T09:00:00Z",
        deliveryTime: "2023-06-27T09:00:00Z",
      },
    ];

    setOrders(dummyOrders);
  }, []);

  const viewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Lịch Sử Đơn Hàng</h4>
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
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td className="py-4 px-4 text-center align-middle">{`#${order.orderId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.customerName}</td>
                  <td className="py-4 px-4 text-center align-middle">{order.service}</td>
                  <td className="py-4 px-4 text-center align-middle">{new Date(order.receiptTime).toLocaleString()}</td>
                  <td className="py-4 px-4 text-center align-middle">{new Date(order.deliveryTime).toLocaleString()}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => viewDetails(order.orderId)}
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

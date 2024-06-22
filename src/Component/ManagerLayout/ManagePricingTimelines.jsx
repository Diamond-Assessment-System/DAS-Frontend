import React, { useState } from "react";
import "../ManagerLayout/ManagePricingTimelines.css";
const ManageOrderTimelines = () => {
  const [orders, setOrders] = useState([
    { id: 1, name: "Order 1", deliveryTime: "" },
    { id: 2, name: "Order 2", deliveryTime: "" },
    { id: 3, name: "Order 3", deliveryTime: "" },
  ]);

  const handleTimeChange = (id, time) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, deliveryTime: time } : order
      )
    );
  };

  const handleSave = () => {
    // Logic to save orders and their delivery times
    console.log("Orders:", orders);
  };

  return (
    <div>
      <h1>Manage Order Timelines</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Delivery Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.name}</td>
              <td>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={order.deliveryTime}
                  onChange={(e) => handleTimeChange(order.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ManageOrderTimelines;

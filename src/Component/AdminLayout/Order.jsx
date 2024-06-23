import React from "react";
import "../AdminLayout/Order.css";
const Orders = () => {
  return (
    <div className="orders">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>John Doe</td>
            <td>2024-06-23</td>
            <td>Shipped</td>
            <td>$5,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Orders;

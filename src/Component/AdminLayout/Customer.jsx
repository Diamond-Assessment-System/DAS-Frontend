import React from "react";
import "../AdminLayout/Customer.css";
const Customers = () => {
  return (
    <div className="customers">
      <h1>Customers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>+1234567890</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Customers;

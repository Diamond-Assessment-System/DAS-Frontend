import React from "react";
import { Link } from "react-router-dom";
import "../AdminLayout/SidebarAdmin.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <h2>Diamond Store Admin</h2>
      <ul>
        <li>
          <Link to="/dashboardadmin">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/reports">Reports</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;

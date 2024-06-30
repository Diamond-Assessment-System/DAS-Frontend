import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SidebarAdmin";
import "../AdminLayout/AdminLayout.css"; // Make sure to create and import a CSS file

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

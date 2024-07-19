import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./SidebarAdmin";
import "../AdminLayout/AdminLayout.css"; 
import useCheckRole from "../../utils/hookCheckRole";

const AdminLayout = () => {
  useCheckRole([5, 6]);

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

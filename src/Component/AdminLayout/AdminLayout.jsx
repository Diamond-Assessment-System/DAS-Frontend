import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin";

const AdminLayout = () => {
  return (
    <div>
      <SidebarAdmin />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

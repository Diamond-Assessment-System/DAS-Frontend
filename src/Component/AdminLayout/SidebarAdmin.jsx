import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../AdminLayout/AdminLayout.css";

const SidebarAdmin = () => {
  return (
    <div className="admin-sidebar w-64 min-h-screen p-4 bg-gray-50 text-gray-800">
      <h3 className="admin-sidebar-heading text-lg font-semibold text-gray-800 mb-4">
        Admin Dashboard
      </h3>
      <ul className="admin-sidebar-list space-y-2">
        <li className="admin-sidebar-item">
          <NavLink
            to="/"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            🏠 Home
          </NavLink>
        </li>
        {/* <li className="admin-sidebar-item">
          <NavLink
            to="/admin/create-manage-users"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            Manage Users
          </NavLink>
        </li> */}
        <li className="admin-sidebar-item">
          <NavLink
            to="/admin/block-suspend-users"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            Block User
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink
            to="/admin/assign-roles-permissions"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            Assign Roles
          </NavLink>
        </li>
        {/* <li className="admin-sidebar-item">
          <NavLink
            to="/admin/system-maintenance"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            System Maintenance
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink
            to="/admin/system-update"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            System Update
          </NavLink>
        </li>
        <li className="admin-sidebar-item">
          <NavLink
            to="/admin/content-database"
            className="flex items-center py-2 px-3 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
            activeClassName="bg-gray-300 font-semibold"
          >
            Content Database
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
};

export default SidebarAdmin;

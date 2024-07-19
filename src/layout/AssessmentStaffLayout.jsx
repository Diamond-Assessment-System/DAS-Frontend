import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAs from "../Component/HeaderAs/HeaderAs";
import SideBarAs from "../Component/SideBarAs/SideBarAs";
import useCheckRole from "../utils/hookCheckRole";

function AssessmentStaffLayout() {
  useCheckRole([2, 4, 6]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header>
        <HeaderAs />
      </header>
      <div className="flex flex-grow w-full">
        <aside className="sidebar bg-gray-800 text-white w-64">
          <SideBarAs />
        </aside>
        <main className="main-content flex-grow bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AssessmentStaffLayout;

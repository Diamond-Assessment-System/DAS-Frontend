import React from "react";
import HeaderCs from "../Component/HeaderCs/HeaderCs";
import SideBarCs from "../Component/SideBarCs/SideBarCs";
import { Outlet } from "react-router-dom";

const ConsultingStaffLayout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <HeaderCs />
      <div className="flex flex-grow w-full">
        <div className=" text-white min-h-full">
          <SideBarCs />
        </div>
        <div className="flex-grow bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ConsultingStaffLayout;

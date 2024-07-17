import React from 'react';
import HeaderCs from '../Component/HeaderCs/HeaderCs';
import SideBarCs from '../Component/SideBarCs/SideBarCs';
import { Outlet } from 'react-router-dom';
import useCheckRole from "../utils/hookCheckRole";


const ConsultingStaffLayout = () => {
  useCheckRole([3, 4, 6]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="header">
        <HeaderCs />
      </header>
      <div className="flex flex-grow w-full">
        <aside className="sidebar text-white">
          <SideBarCs />
        </aside>
        <main className="main-content flex-grow bg-gray-100 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ConsultingStaffLayout;

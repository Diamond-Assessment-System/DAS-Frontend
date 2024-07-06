import { Outlet } from "react-router-dom";
import HeaderAs from "../Component/HeaderAs/HeaderAs";
import SideBarAs from "../Component/SideBarAs/SideBarAs";

function AssessmentStaffLayout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
    <header className="header">
      <HeaderAs />
    </header>
    <div className="flex flex-grow w-full">
      <aside className="sidebar text-white">
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


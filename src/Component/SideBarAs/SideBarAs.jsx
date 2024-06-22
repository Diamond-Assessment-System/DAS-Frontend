import { NavLink } from "react-router-dom";

function SideBarAs() {
  return (
    <div className="sidenav w-64 text-gray-800 min-h-screen p-2">
      <NavLink
        to="/"
        className="flex items-center py-2 px-1 rounded transition duration-200 hover:bg-gray-100 mb-1 text-gray-800 text-sm whitespace-nowrap"
        activeclassname="bg-gray-200"
      >
        <span className="mr-1 text-lg">🏠</span> Trang Chủ
      </NavLink>
      <NavLink
        to="/assessmentstaff/assessmentbooking"
        className="flex items-center py-2 px-1 rounded transition duration-200 hover:bg-gray-100 mb-1 text-gray-800 text-sm whitespace-nowrap"
        activeclassname="bg-gray-200"
      >
        <span className="mr-1 text-lg">📄</span> Đơn Hàng Dịch Vụ
      </NavLink>
      {/* <NavLink
        to="/assessmentstaff/assessmentpaper"
        className="flex items-center py-2 px-1 rounded transition duration-200 hover:bg-gray-100 text-gray-800 text-sm whitespace-nowrap"
        activeClassName="bg-gray-200"
      >
        <span className="mr-1 text-lg">📋</span> Đơn Giám Định
      </NavLink> */}
      <NavLink
        to="/assessmentstaff/assessmentpaperlist"
        className="flex items-center py-2 px-1 rounded transition duration-200 hover:bg-gray-100 text-gray-800 text-sm whitespace-nowrap"
        activeclassname="bg-gray-200"
      >
        <span className="mr-1 text-lg">📋</span> Giấy Giám Định
      </NavLink>
    </div>
  );
}

export default SideBarAs;

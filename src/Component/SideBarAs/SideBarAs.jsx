import { NavLink } from "react-router-dom";

function SideBarAs() {
  return (
    <div className="sidenav w-64 min-h-screen p-4 bg-gray-50 text-gray-800">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800 text-sm whitespace-nowrap"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-2 text-lg">🏠</span> Trang Chủ
        </NavLink>
        <NavLink
          to="/assessmentstaff/assessmentbooking"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800 text-sm whitespace-nowrap"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-2 text-lg">📄</span> Đơn Hàng Dịch Vụ
        </NavLink>
        <NavLink
          to="/assessmentstaff/assessmentpaperlist"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800 text-sm whitespace-nowrap"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-2 text-lg">📋</span> Giấy Giám Định
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBarAs;

import { NavLink } from "react-router-dom";

function SideBarCs() {
  return (
    <div className="s w-full text-gray-800 min-h-screen p-4">
      <NavLink
        to="/"
        className="flex items-center py-2 px-3 rounded transition duration-200 hover:bg-gray-100 mb-2 text-gray-800"
        activeclassname="bg-gray-200"
      >
        <span className="mr-2">🏠</span> Trang Chủ
      </NavLink>
      <NavLink
        to="/consultingstaff/assessmentrequest"
        className="flex items-center py-2 px-3 rounded transition duration-200 hover:bg-gray-100 mb-2 text-gray-800"
        activeclassname="bg-gray-200"
      >
        <span className="mr-2">📄</span> Yêu Cầu Dịch Vụ
      </NavLink>
      <NavLink
        to="/consultingstaff/assessmentpaper"
        className="flex items-center py-2 px-3 rounded transition duration-200 hover:bg-gray-100 text-gray-800"
        activeclassname="bg-gray-200"
      >
        <span className="mr-2">📋</span> Đơn Giám Định
      </NavLink>
      <NavLink
        to="/consultingstaff/assetsmentpaper"
        className="flex items-center py-2 px-3 rounded transition duration-200 hover:bg-gray-100 text-gray-800"
        activeclassname="bg-gray-200"
      >
        <span className="mr-2">📋</span> Giấy Giám Định
      </NavLink>
    </div>
  );
}

export default SideBarCs;

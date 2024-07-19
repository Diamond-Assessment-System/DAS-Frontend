import { NavLink } from "react-router-dom";

function SideBarCs() {
  return (
    <div className="w-full min-h-screen p-4 bg-gray-50 text-gray-800">
      <nav className="space-y-2">

        <NavLink
          to="/consultingstaff/assessmentrequest"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📄</span> Yêu Cầu Dịch Vụ
        </NavLink>
        <NavLink
          to="/consultingstaff/assessmentpaperlist"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Giấy Giám Định
        </NavLink>
        <NavLink
          to="/consultingstaff/receipt"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Biên Nhận Giám Định
        </NavLink>
        <NavLink
          to="/consultingstaff/reprintpaper"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Cấp Lại Giấy Giám Định
        </NavLink>
        <NavLink
          to="/consultingstaff/sealdiamond"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeclassname="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Yêu Cầu Niêm Phong
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBarCs;

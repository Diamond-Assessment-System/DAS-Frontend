import { NavLink } from "react-router-dom";

function SideBarCs() {
  return (
    <div className="w-full min-h-screen p-4 bg-gray-50 text-gray-800">
      <nav className="space-y-2">
        <NavLink
          to="/"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeClassName="bg-gray-300 font-semibold"
        >
          <span className="mr-3">🏠</span> Trang Chủ
        </NavLink>
        <NavLink
          to="/consultingstaff/assessmentrequest"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeClassName="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📄</span> Yêu Cầu Dịch Vụ
        </NavLink>
        <NavLink
          to="/consultingstaff/assetsmentpaper"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeClassName="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Giấy Giám Định
        </NavLink>
        <NavLink
          to="/consultingstaff/receipt"
          className="flex items-center py-3 px-4 rounded-lg transition duration-200 hover:bg-gray-200 text-gray-800"
          activeClassName="bg-gray-300 font-semibold"
        >
          <span className="mr-3">📋</span> Biên Nhận Giám Định
        </NavLink>
      </nav>
    </div>
  );
}

export default SideBarCs;

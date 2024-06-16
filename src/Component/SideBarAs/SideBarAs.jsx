import { NavLink } from "react-router-dom";
import "./SideBarAs.css";

function SideBarAs() {
  return (
    <div className="sidenav">
      <NavLink to="/assessmentstaff">🏠︎Trang Chủ</NavLink>
      <NavLink to="/assessmentstaff/assessmentbooking">
        Đơn Hàng Dịch Vụ
      </NavLink>
      <NavLink to="/assessmentstaff/assessmentbooking">Đơn Giám Định</NavLink>
      <NavLink to="/assessmentstaff/assessmentpaper">Giấy Giám Định</NavLink>
    </div>
  );
}
export default SideBarAs;

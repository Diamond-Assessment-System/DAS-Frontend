import React from "react";
import { Link } from "react-router-dom";
import "../ManagerLayout/NavBarManager.css";
import { Button } from "react-bootstrap";
import {
  handleSession,
  clearSession,
  checkSession,
} from "../../utils/sessionUtils";
import { useNavigate } from "react-router-dom";

const handleLogout = () => {
  clearSession();
  setUserName(null);
  setRole(0);
  navigate("/");
};

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-header">
          <Link to="/manager" className="navbar-brand">
            Cổng Quản Lí
          </Link>

        </div>
        <div className={`navbar-menu ${isOpen ? "open" : ""}`}>
          <Link to="/manager" className="navbar-link" onClick={toggleMenu}>
            Dashboard
          </Link>
          <Link
            to="/manager/manage-pricing-timelines"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Quản Lí Dịch Vụ
          </Link>
          <Link
            to="/manager/manage-service-pricing"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Quản Lí Giá Dịch Vụ
          </Link>

          {<Link
            to="/manager/commit"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Giấy Cam Kết
          </Link>}

          <Link
            to="/manager/assignpaper"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Phân Mẫu
          </Link>
          <Link
            to="/manager/managerhistory"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Lịch Sử Đặt Hẹn
          </Link>
          <Link
            to="/manager/manageruser"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Tài Khoản Khách Hàng
          </Link>
          <Link
            to="/manager/feedback"
            className="navbar-link"
            onClick={toggleMenu}
          >
            Phản Hồi Khách Hàng
          </Link>
          <Link
            to="/"
            className="navbar-link"
            onClick={handleLogout}
          >
            Đăng Xuất
          </Link>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;

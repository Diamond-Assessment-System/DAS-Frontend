import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logodas.png";
import { Menu, Close } from "@mui/icons-material";
import {
  handleSession,
  clearSession,
  checkSession,
} from "../../utils/sessionUtils";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const account = checkSession();
    if (account && account.displayName) {
      setUserName(account.displayName);
      setRole(account.role);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    clearSession();
    setUserName(null);
    setRole(0);
    navigate("/");
  };

  const getButtonProperties = () => {
    switch (role) {
      case 1:
        return { text: "Đặt Hẹn", path: "/makerequest" };
      case 2:
        return { text: "Consult", path: "/consultingstaff" };
      case 3:
        return { text: "Assess", path: "/assessmentstaff" };
      default:
        return { text: "Đặt Hẹn", path: "/makerequest" };
    }
  };

  const { text, path } = getButtonProperties();

  return (
    <header className="header bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full pd-0 z-30">
    {/* // <header className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full pd-0 "> */}
      <div className="flex items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img className="h-20" src={logo} alt="DAS Logo" />
        </div>
        <div
          className="md:hidden ml-4 cursor-pointer"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <Close style={{ color: "white", fontSize: 30 }} />
          ) : (
            <Menu style={{ color: "white", fontSize: 30 }} />
          )}
        </div>
      </div>
      <nav className={`md:flex ${isMobileMenuOpen ? "block" : "hidden"}  `}>
        <ul className="pl-11 flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center p-4 md:p-0 ">
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/about");
              setIsMobileMenuOpen(false);
            }}
          >
            Về DAS
          </li>
          <Dropdown
            show={isDropdownOpen} // Sử dụng show để điều khiển hiển thị menu
            // onMouseEnter={() => setIsDropdownOpen(true)} // Khi hover vào toggle thì hiển thị menu
            // onMouseLeave={() => setIsDropdownOpen(false)} // Khi rời chuột khỏi toggle thì ẩn menu
            onClick={() => setIsDropdownOpen(true)} // Khi nhấn vào thì giữ menu hiển thị
          >
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="cursor-pointer hover:text-gray-400 diamond-dropdown"
              style={{
                backgroundColor: "black",
                color: "white",
                // fontWeight: "bold",
                // fontFamily: "inherit",
                fontSize: "20px",
              }}
            >
              Kim Cương
            </Dropdown.Toggle>
            <Dropdown.Menu
              onMouseEnter={() => setIsDropdownOpen(true)} // Khi hover vào menu thì giữ menu hiển thị
              onMouseLeave={() => setIsDropdownOpen(false)} // Khi rời chuột khỏi menu thì ẩn menu
              onClick={() => setIsDropdownOpen(true)} // Khi nhấn vào thì giữ menu hiển thị
            >
              <Dropdown.Item
                onClick={() => {
                  navigate("/diamonds");
                  setIsDropdownOpen(false);
                }}
              >
                Trang Kim Cương
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  navigate("/hierarchy");
                  setIsDropdownOpen(false);
                }}
              >
                Phân Cấp Kim Cương
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/services");
              setIsMobileMenuOpen(false);
            }}
          >
            Dịch Vụ Giám Định
          </li>
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/lookup");
              setIsMobileMenuOpen(false);
            }}
          >
            Tra Cứu
          </li>
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(path)}
          className="bg-transparent border border-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
        >
          {text}
        </button>
        {userName ? (
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="ml-2"
              style={{
                backgroundColor: "black",
                borderColor: "white",
                color: "white",
                fontWeight: "bold",
                padding: "10px",
              }}
            >
              {userName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/history">Lịch sử đặt hẹn</Dropdown.Item>
              <Dropdown.Item href="/account">Thông tin cá nhân</Dropdown.Item>
              <Dropdown.Item href="/lookup">Dò giấy giám định</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="text-danger">
                Đăng xuất
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            variant="primary"
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "black",
              borderColor: "white",
              color: "white",
              fontWeight: "bold",
              width: "143px",
              marginBottom: "1.5rem",
              padding: "0",
            }}
          >
            Đăng Nhập / Đăng Ký
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

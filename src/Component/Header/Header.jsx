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
    // <header className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full pd-0">
    <header className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full pd-0 z-30">
      <div className="flex items-center">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <img className="h-12" src={logo} alt="DAS Logo" />
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
      <nav
        className={`md:flex ${isMobileMenuOpen ? "block" : "hidden"}  `}
//         className={`flex-1 md:flex items-center justify-center ${
//           isMobileMenuOpen ? "block" : "hidden"
//         } md:flex md:items-center md:justify-center absolute md:relative top-16 md:top-auto left-0 md:left-auto bg-black md:bg-transparent w-full md:w-auto`}
      >
        <ul  className="pl-11 flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center p-4 md:p-0 " >
          <li
            className="cursor-pointer hover:text-gray-400 "
            onClick={() => {
              navigate("/about");
              setIsMobileMenuOpen(false);
            }}
          >
            Về DAS
          </li>
          <li
            className="cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/diamonds");
              setIsMobileMenuOpen(false);
            }}
          >
            Kim Cương
          </li>
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
              marginBottom: "1rem",
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

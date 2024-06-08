import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logodas.png";
import { AccountCircle, Menu, Close } from "@mui/icons-material";
import Cookies from "js-cookie";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const account = Cookies.get("account");
    if (account) {
      const parsedAccount = JSON.parse(account);
      if (parsedAccount.name && parsedAccount.avatar) {
        setUserName(parsedAccount.name);
        setAvatarUrl(parsedAccount.avatar);
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="bg-black text-white flex items-center justify-between px-6 py-4 fixed top-0 left-0 w-full z-50">
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
        className={`md:flex ${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute md:relative top-16 md:top-auto left-0 md:left-auto bg-black md:bg-transparent w-full md:w-auto`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center p-4 md:p-0">
          <li
            className="cursor-pointer hover:text-gray-400"
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
          onClick={() => navigate("/makerequest")}
          className="bg-transparent border border-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Đặt Hẹn
        </button>
        {userName ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleLoginClick}
          >
            <span>Xin chào, {userName}!</span>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <AccountCircle style={{ color: "white", fontSize: 30 }} />
            )}
          </div>
        ) : (
          <div
            className="cursor-pointer hidden md:block"
            onClick={handleLoginClick}
          >
            <AccountCircle style={{ color: "white", fontSize: 30 }} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

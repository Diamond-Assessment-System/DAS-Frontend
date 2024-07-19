import React from "react";
import logo from "../../assets/logodas.png";
import exitIcon from "../../assets/exit.png";
import { useNavigate } from "react-router-dom";
import { clearSession } from "../../utils/sessionUtils";
import { Button } from "react-bootstrap";
import {
  handleSession,
 // clearSession,
  checkSession,
} from "../../utils/sessionUtils";
//import { useNavigate } from "react-router-dom";
function HeaderAs() {
  const navigate = useNavigate();



  const handleLogout = () => {
    clearSession();
    //setUserName(null);
    //setRole(0);
    navigate("/");
  };


  return (
    <header className="bg-black shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="DAS Logo" className="h-12 mr-4" />
        <h1 className="text-xl font-bold text-white">Assessment Staff</h1>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      >
        <img src={exitIcon} alt="Exit" className="h-6 w-6" />
      </button>
    </header>
  );
}

export default HeaderAs;

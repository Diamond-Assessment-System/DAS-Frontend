import React from "react";
import logo from "../../assets/logodas.png";
import exitIcon from "../../assets/exit.png";

function HeaderCs() {
  return (
    <header className="bg-black shadow p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src={logo} alt="DAS Logo" className="h-12 mr-4" />
        <h1 className="text-xl font-bold text-white">Consulting Staff</h1>
      </div>
      <button
        onClick={() => console.log("Exit clicked")}
        className="p-3 rounded-full hover:bg-gray-600 transition duration-300 ease-in-out"
      >
        <img src={exitIcon} alt="Exit" className="h-6 w-6" />
      </button>
    </header>
  );
}

export default HeaderCs;

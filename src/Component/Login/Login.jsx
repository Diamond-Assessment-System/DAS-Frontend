import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { signInWithGoogle } from "../../utils/authUtils";
import illustration from "../../assets/loginbackground.png";
import Cookies from "js-cookie";

const GoogleLoginComponent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = async (userInfo) => {
    setUser(userInfo);
    Cookies.set("account", JSON.stringify(userInfo));
    navigate("/");
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed", error);
  };

  const login = async () => {
    try {
      const userInfo = await signInWithGoogle();
      handleLoginSuccess(userInfo);
    } catch (error) {
      handleLoginFailure(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-blue-800 items-center justify-center">
          <img
            src={illustration}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-12">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold mt-4 text-gray-900">DAS</h1>
            <h2 className="text-xl text-gray-800 mt-2">
              We Valued Your Diamond!
            </h2>
          </div>
          {user ? (
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-900">
                Welcome, {user.name}
              </h3>
              <Avatar
                src={user.picture}
                alt={user.name}
                className="w-20 h-20 mx-auto my-4"
              />
              <p className="text-xl text-gray-700">Email: {user.email}</p>
            </div>
          ) : (
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-700 transition w-full text-xl"
              onClick={login}
            >
              Dùng tài khoản Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginComponent;

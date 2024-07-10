import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { signInWithGoogle, signInWithPhoneNumber } from "../../utils/authUtils";
import { Phone, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import illustration from "../../assets/loginbackground.png";

const GoogleLoginComponent = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("google");

  const handleLoginSuccess = async (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
    switch (userInfo.role) {
      case 1:
        navigate("/");
        break;
      case 2:
        navigate("/consultingstaff");
        break;
      case 3:
        navigate("/assessmentstaff");
        break;
      case 4:
        navigate("/manager");
        break;
      default:
        navigate("/");
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed", error);
    setLoading(false);
  };

  const loginWithGoogle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const userInfo = await signInWithGoogle();
      handleLoginSuccess(userInfo);
    } catch (error) {
      handleLoginFailure(error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhoneNumber = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const userInfo = await signInWithPhoneNumber(phoneNumber, password);
      handleLoginSuccess(userInfo);
    } catch (error) {
      handleLoginFailure(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <button
          className="absolute top-4 right-4 text-black text-2xl"
          onClick={() => navigate("/")}
        >
          &#x2715;
        </button>
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-blue-800">
          <img
            src={illustration}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mt-4 text-gray-900">DAS</h1>
            <h2 className="text-xl text-gray-800 mt-2">
              We Value Your Diamond!
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
            <>
              <div className="mb-4 w-full flex justify-center">
                <button
                  className={`${
                    loginMethod === "google"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4 mx-2 rounded transition-all duration-200`}
                  onClick={() => setLoginMethod("google")}
                >
                  Đăng nhập Google
                </button>
                <button
                  className={`${
                    loginMethod === "phone"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4 mx-2 rounded transition-all duration-200`}
                  onClick={() => setLoginMethod("phone")}
                >
                  Đăng nhập SĐT
                </button>
              </div>
              {loginMethod === "google" ? (
                <button
                  className={`${
                    loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                  } text-white py-3 px-6 mr-20 rounded text-xl block`}
                  onClick={loginWithGoogle}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Dùng tài khoản Google"}
                </button>
              ) : (
                <form onSubmit={loginWithPhoneNumber} className="mb-4 w-full">
                  <div className="mb-4 flex items-center">
                    <Phone className="text-gray-400 mr-3" />
                    <input
                      type="text"
                      placeholder="Số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded"
                      required
                    />
                  </div>
                  <div className="mb-4 flex items-center relative">
                    <Lock className="text-gray-400 mr-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-gray-300 p-2 w-full rounded"
                      required
                    />
                    <div
                      className="ml-3 cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>
                  <div className="mb-4 w-full flex justify-center">
                    <button
                      type="submit"
                      className={`${
                        loading
                          ? "bg-blue-300"
                          : "bg-blue-500 hover:bg-blue-700"
                      } text-white py-3 px-10 mr-20  rounded transition text-xl`}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Đăng nhập"}
                    </button>
                  </div>
                </form>
              )}
              <div className="text-center">
                <p className="text-gray-700">
                  Chưa có tài khoản?{" "}
                  <Link
                    to="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Đăng ký
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginComponent;

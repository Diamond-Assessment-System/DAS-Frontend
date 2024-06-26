import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { signInWithGoogle, signInWithPhoneNumber } from "../../utils/authUtils";
import "../Login/Login.css";
import illustration from "../../assets/loginbackground.png";
import { Phone, Lock, Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons from Material-UI

const GoogleLoginComponent = () => {
  const [user, setUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showPassword, setShowPassword] = useState(false); // Show/hide password state
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
    setLoading(false); // Reset loading state on failure
  };

  const loginWithGoogle = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      const userInfo = await signInWithGoogle();
      handleLoginSuccess(userInfo);
    } catch (error) {
      handleLoginFailure(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const loginWithPhoneNumber = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks
    setLoading(true);
    try {
      const userInfo = await signInWithPhoneNumber(phoneNumber, password);
      handleLoginSuccess(userInfo);
    } catch (error) {
      handleLoginFailure(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full">
      <button
        className="home-button"
        onClick={() => navigate("/")}
      >
        &#x2715;
      </button>
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden">
        <div className="hidden md:flex w-1/2 bg-blue-800 items-center justify-center">
          <img
            src={illustration}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-12">
          <div className="flex justify-end mb-8">
            <div>
              {user ? (
                <Avatar
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 mx-2"
                />
              ) : null}
            </div>
          </div>
          <div className="flex flex-col items-center mb-8">
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
              <div className="mb-4 flex justify-around">
                <button
                  className={`${
                    loginMethod === "google"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4 rounded w-full mx-2`}
                  onClick={() => setLoginMethod("google")}
                >
                  Đăng nhập Google
                </button>
                <button
                  className={`${
                    loginMethod === "phone"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  } py-2 px-4 rounded w-full mx-2`}
                  onClick={() => setLoginMethod("phone")}
                >
                  Đăng nhập SĐT
                </button>
              </div>
              {loginMethod === "google" ? (
                <button
                  className={`${
                    loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                  } text-white py-3 px-6 rounded transition w-full text-xl`}
                  onClick={loginWithGoogle}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Dùng tài khoản Google"}
                </button>
              ) : (
                <form onSubmit={loginWithPhoneNumber} className="mb-4">
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
                  <div className="mb-4 flex items-center show-hide-password">
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
                      className="eye-icon"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={`${
                      loading ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-700"
                    } text-white py-3 px-6 rounded transition w-full text-xl mb-4`}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Đăng nhập"}
                  </button>
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

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AccountCircle, Phone, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import backgroundImage from "../../assets/backgroundlogin.png"; // Update the path as necessary
import illustration from "../../assets/loginbackground.png"; // Update the path to your image
import { API_BASE_URL } from "../../utils/apiEndPoints";

const RegisterComponent = () => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!phone || phone.length < 10) {
      alert("Phone number must be valid and contain at least 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userInfo = {
      email: null,  
      displayName: fullName,
      uid: "",  
      accountStatus: 1,  
      role: 1, 
      password: password,
      phone: phone,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/registerPhone`, userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(`Registration failed: ${response.data}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
    >
      <div className="relative bg-white rounded-lg shadow-lg flex max-w-4xl w-full overflow-hidden bg-opacity-90">
        <button
          className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-700 transition"
          onClick={handleGoBack}
        >
          &#x2715;
        </button>
        <div className="hidden md:flex bg-blue-800 items-center justify-center w-1/2">
          <img
            src={illustration}
            alt="Illustration"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">DAS</h1>
            <h2 className="text-xl text-gray-800 mt-2">We Value Your Diamond!</h2>
          </div>
          <form onSubmit={handleRegister} className="w-full">
            <div className="mb-6 flex items-center">
              <AccountCircle className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Họ và Tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 flex items-center">
              <Phone className="text-gray-400 mr-3" />
              <input
                type="tel"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6 flex items-center relative">
              <Lock className="text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                required
              />
              <div
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            <div className="mb-6 flex items-center relative">
              <Lock className="text-gray-400 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-blue-500"
                required
              />
              <div
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={toggleShowConfirmPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-700 transition w-full text-xl font-semibold"
            >
              Đăng ký
            </button>
          </form>
          <div className="mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import {
  AccountCircle,
  Phone,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import illustration from "../../assets/loginbackground.png";

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
      fullName,
      phoneNumber: phone,
      password,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <button
          className="absolute top-4 right-4 text-black text-2xl"
          onClick={handleGoBack}
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
          <form onSubmit={handleRegister} className="w-full">
            <div className="mb-4 flex items-center">
              <AccountCircle className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Họ và Tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4 flex items-center relative w-full">
              <Phone className="text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <PhoneInput
                country={"vn"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="w-full border border-gray-300 pl-12 pr-4 py-2 rounded"
                containerClass="w-full"
                buttonClass="bg-gray-200"
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
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <div className="mb-4 flex items-center relative">
              <Lock className="text-gray-400 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <div className="mb-4 w-full flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-8 mr-20 rounded hover:bg-blue-700 text-xl"
              >
                Đăng ký
              </button>
            </div>
          </form>
          <div className="text-center">
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

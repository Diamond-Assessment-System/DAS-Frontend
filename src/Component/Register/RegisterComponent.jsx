import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./RegisterComponent.css"; // Đường dẫn đã được sửa lại
import illustration from "../../assets/loginbackground.png";
import { AccountCircle, Phone, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

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

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits and contain only numbers.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userInfo = {
      phone,
      fullName,
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
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <button
        className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-700"
        onClick={handleGoBack}
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
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-bold mt-4 text-gray-900">DAS</h1>
            <h2 className="text-xl text-gray-800 mt-2">
              We Valued Your Diamond!
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
            <div className="mb-4 flex items-center">
              <Phone className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <span
                className="password-icon"
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
                className="password-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-700 transition w-full text-xl"
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

// import React, { useState } from "react";
import React, { useState, useEffect } from "react"; 
import { useNavigate, Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { AccountCircle, Phone, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./RegisterComponent.css";
import illustration from "../../assets/loginbackground.png";

const RegisterComponent = () => {
  const [phone, setPhone] = useState("");
  const [displayName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    general: ""
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({ phone: "", password: "", confirmPassword: "", general: "" });

    if (!phone || phone.length < 10) {
      setErrors(prev => ({ ...prev, phone: "Phone number must be valid and contain at least 10 digits." }));      
      return;
    }

    if (password !== confirmPassword) {
      // alert("Passwords do not match!");
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match!" }));
      return;
    }

    let formattedPhone = phone;
    if (phone.startsWith("84")) {
      formattedPhone = phone.substring(2);
    }
    if (phone.startsWith("1")) {
      formattedPhone = phone.substring(2);
    }

    const userInfo = {
      displayName,
      password,
      phone: formattedPhone
    };

    try {
      // const response = await fetch("http://localhost:8080/api/accounts/phoneregister", {
        const response = await fetch("https://das-backend.fly.dev/api/accounts/phoneregister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        // alert("Registration successful!");
        // navigate("/login");
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        if (errorData.message) {
          setErrors(prev => ({ ...prev, general: errorData.message }));
        } else if (errorData.errors) {
          setErrors(prev => ({ ...prev, general: Object.values(errorData.errors).join(", ") }));
        } else {
          setErrors(prev => ({ ...prev, general: `Registration failed. HTTP error! status: ${response.status}` }));
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors(prev => ({ ...prev, general: `An unexpected error occurred: ${error.message}` }));  
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
<button
  className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-700"
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
                value={displayName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4 flex items-center relative phone-input-container">
              <Phone className="text-gray-400 phone-icon" />
              <PhoneInput
                country={"vn"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="w-full border border-gray-300 p-2 rounded"
                containerClass="phone-input"
                buttonClass="phone-input-button"
                required
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
            {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}
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
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="w-16 h-16 relative mb-4">
              <CheckCircleIcon className="text-green-500 w-full h-full animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Registration Successful!</h2>
            <p className="text-gray-600">Redirecting to login page...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterComponent;

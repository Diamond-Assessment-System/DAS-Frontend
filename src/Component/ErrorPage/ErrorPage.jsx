import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "../../assets/error_page_icon.png";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const account = handleSession(navigate);
    if (!account) {
      navigate(`/`);
      return;
    }

      const accountrole = checkRole();
      
      if (accountrole.role === 1 || accountrole.role === 6) {
        navigate(`/`);
      } else if (accountrole.role === 2) {
        navigate(`/assessmentstaff`);
      } else if (accountrole.role === 3) {
        navigate(`/consultingstaff`);
      } else if (accountrole.role === 4) {
        navigate(`/manager`);
      } else if (accountrole.role === 5) {
        navigate(`/admin`);
      }

  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3">
      <img src={errorImage} alt="Lỗi" className="w-1/4 max-w-xs mb-6" />
      <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
        404 - Không Tìm Thấy Trang
      </h1>
      <p className="text-xl mb-6 text-gray-600 text-center">
        Trang bạn đang tìm kiếm đang bảo trì vui lòng quay lại sau.
      </p>
      <button
        onClick={handleButtonClick}
        className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg text-lg"
      >
        Quay lại Trang Chủ
      </button>
    </div>
  );
};

export default ErrorPage;

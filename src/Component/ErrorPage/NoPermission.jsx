import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import errorImage from "../../assets/error_page_icon.png";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const NoPermissionPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const account = handleSession(navigate);
    const role = checkRole(account.accountId);

    if (!account || role === 1 || role !== 6) {
      navigate(`/`);
    } else if (role === 2) {
      navigate(`/assessmentstaff`);
    } else if (role === 3) {
      navigate(`/consultingstaff`);
    } else if (role === 4) {
      navigate(`/manager`);
    } else if (role === 5) {
      navigate(`/admin`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-3">
      <img src={errorImage} alt="Lỗi" className="w-1/4 max-w-xs mb-6" />
      <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
        NO PERMISSION!
      </h1>
      <p className="text-xl mb-6 text-gray-600 text-center">
        Bạn không có quyền truy cập vào trang này!!!
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

export default NoPermissionPage;

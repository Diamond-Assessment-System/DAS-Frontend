import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/manager/managerhistory");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Thanh Toán Thành Công</h1>
        <p className="text-xl mb-6 text-gray-600">
          Cảm ơn bạn! Đơn hàng của bạn đã được thanh toán thành công.
        </p>
        <p className="text-gray-600">
          Bạn sẽ được chuyển hướng về trang quản lý lịch sử sau ít giây...
        </p>
      </div>
    </div>
  );
}

export default PaymentSuccess;

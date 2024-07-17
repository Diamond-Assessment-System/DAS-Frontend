import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

function SealHistory() {
  const [sealHistory, setSealHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const account = handleSession(navigate);
    if (!account) {
        navigate(`/login`);
    }
    if (checkRole(account.accountId) != 4 || checkRole(account.accountId) != 6){
        navigate(`/nopermission`);
    };

    const history = JSON.parse(localStorage.getItem("sealedDiamonds")) || [];
    setSealHistory(history);
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Lịch Sử Seal Kim Cương</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Mã kim cương</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Ngày Seal</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {sealHistory.map((diamond, index) => (
                <tr key={index}>
                  <td className="py-4 px-4 text-center align-middle">{`#${diamond.orderId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.diamondId}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.customerName}</td>
                  <td className="py-4 px-4 text-center align-middle">{new Date(diamond.sealedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SealHistory;

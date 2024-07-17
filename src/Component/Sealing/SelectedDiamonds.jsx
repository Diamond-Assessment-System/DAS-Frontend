import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SelectedDiamonds() {
  const [selectedDiamonds, setSelectedDiamonds] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const diamonds = JSON.parse(localStorage.getItem("selectedDiamonds")) || [];
    setSelectedDiamonds(diamonds);
  }, []);

  const completeSealing = (diamondId) => {
    const diamond = selectedDiamonds.find(d => d.diamondId === diamondId);
    const sealedDiamond = { ...diamond, sealedAt: new Date().toISOString() };

    let existingSealedDiamonds = JSON.parse(localStorage.getItem("sealedDiamonds")) || [];
    existingSealedDiamonds.push(sealedDiamond);
    localStorage.setItem("sealedDiamonds", JSON.stringify(existingSealedDiamonds));

    const updatedSelectedDiamonds = selectedDiamonds.filter(d => d.diamondId !== diamondId);
    setSelectedDiamonds(updatedSelectedDiamonds);
    localStorage.setItem('selectedDiamonds', JSON.stringify(updatedSelectedDiamonds));
    
    setMessage(`Viên kim cương ${diamondId} đã được hoàn thành seal.`);
  };

  const viewHistory = () => {
    navigate('/manager/sealhistory');
  };

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Kim Cương Đã Chọn Seal</h4>
        {message && <div className="mb-4 text-green-500">{message}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Mã kim cương</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Hoàn Thành</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {selectedDiamonds.map((diamond) => (
                <tr key={diamond.diamondId}>
                  <td className="py-4 px-4 text-center align-middle">{`#${diamond.orderId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.diamondId}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.customerName}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => completeSealing(diamond.diamondId)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Hoàn Thành Seal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={viewHistory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
        >
          Xem Lịch Sử
        </button>
      </div>
    </div>
  );
}

export default SelectedDiamonds;

import React, { useState } from "react";
import "../DetailsAssetment/DetailsAssetsment.css";
function DetailsAssetsment() {
  const [diamonds, setDiamonds] = useState([
    { id: Date.now(), name: "", size: "" },
  ]);

  const handleAddDiamond = () => {
    setDiamonds([...diamonds, { id: Date.now(), name: "", size: "" }]);
  };

  const handleRemoveDiamond = (id) => {
    setDiamonds(diamonds.filter((diamond) => diamond.id !== id));
  };

  const handleDiamondChange = (id, field, value) => {
    const updatedDiamonds = diamonds.map((diamond) =>
      diamond.id === id ? { ...diamond, [field]: value } : diamond
    );
    setDiamonds(updatedDiamonds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý dữ liệu khi người dùng gửi form
    console.log(diamonds);
  };

  return (
    <div className="diamond-order-form">
      <h1>Chi Tiết Đơn Giám Định</h1>
      <form onSubmit={handleSubmit}>
        {/* Tạo trường nhập liệu cho mỗi viên kim cương */}
        {diamonds.map((diamond, index) => (
          <div key={diamond.id} className="diamond-field">
            <label htmlFor={`diamondName${index}`}>
              Tên viên kim cương {index + 1}:
            </label>
            <input
              type="text"
              id={`diamondName${index}`}
              value={diamond.name}
              onChange={(e) =>
                handleDiamondChange(diamond.id, "name", e.target.value)
              }
              required
            />
            <label htmlFor={`diamondSize${index}`}>
              Kích thước viên kim cương {index + 1}:
            </label>
            <input
              type="text"
              id={`diamondSize${index}`}
              value={diamond.size}
              onChange={(e) =>
                handleDiamondChange(diamond.id, "size", e.target.value)
              }
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveDiamond(diamond.id)}
              >
                Xoá
              </button>
            )}
          </div>
        ))}

        <div className="addButtonContainer">
          <button type="button" onClick={handleAddDiamond}>
            Thêm viên kim cương
          </button>
          <button type="submit">Gửi Đơn Hàng</button>
        </div>
      </form>
    </div>
  );
}

export default DetailsAssetsment;

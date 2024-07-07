import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../Paginate/Pagination";
import '../Sealing/SealList.css';
import { createDummyData } from "../Sealing/Dummydata";

function SealList() {
  const navigate = useNavigate();
  const [diamonds, setDiamonds] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [message, setMessage] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    createDummyData();  // Tạo dữ liệu giả
    fetchDiamonds();    // Lấy dữ liệu từ localStorage
  }, []);

  const fetchDiamonds = () => {
    const diamondsData = JSON.parse(localStorage.getItem('diamonds')) || [];
    setDiamonds(diamondsData);
    setLoading(false);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(diamonds.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(diamonds.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, diamonds]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % diamonds.length;
    setItemOffset(newOffset);
  };

  const selectDiamond = (diamond) => {
    // Navigate to the SealForm component with the selected diamond
    navigate('/manager/sealform', { state: { diamond } });
  };

  const navigateToSelectedDiamonds = () => {
    navigate('/manager/sealselect');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Kim Cương Cần Seal</h4>
        {message && <div className="mb-4 text-green-500">{message}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Mã kim cương</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Trạng thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi tiết</th>
                <th className="py-4 px-4 text-center align-middle">Chọn</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((diamond) => (
                <tr key={diamond.diamondId}>
                  <td className="py-4 px-4 text-center align-middle">{`#${diamond.orderId}`}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.diamondId}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.customerName}</td>
                  <td className="py-4 px-4 text-center align-middle">{diamond.status}</td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => navigate(`/diamonds/${diamond.diamondId}`)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Chi tiết
                    </button>
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      onClick={() => selectDiamond(diamond)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Chọn
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        <button
          onClick={navigateToSelectedDiamonds}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
        >
          Xem Kim Cương Đã Chọn
        </button>
      </div>
    </div>
  );
}

export default SealList;

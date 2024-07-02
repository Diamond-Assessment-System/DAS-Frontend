import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "../Paginate/Pagination"; 
import '../Sealing/SealList.css'; 

function SealList() {
  const navigate = useNavigate();
  const [diamonds, setDiamonds] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  const fetchDiamonds = async () => {
    try {
      const response = await axios.get("https://your-api-url.com/api/diamonds-to-seal");
      setDiamonds(response.data);
    } catch (error) {
      console.error("Error fetching diamonds:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiamonds();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(diamonds.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(diamonds.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, diamonds]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % diamonds.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Kim Cương Cần Seal</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Mã kim cương</th>
                <th className="py-4 px-4 text-center align-middle">Tên khách hàng</th>
                <th className="py-4 px-4 text-center align-middle">Trạng thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi tiết</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
}

export default SealList;

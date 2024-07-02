import "./AssessmentPaperList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Paginate/Pagination"; 
function AssessmentPaperList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessmentPapers, setAssessmentPapers] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAssessmentPapers = async () => {
      try {
        const response = await axios.get("https://das-backend.fly.dev/api/assessment-papers");
        setAssessmentPapers(response.data);
      } catch (error) {
        console.error("There was an error fetching the assessment papers!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessmentPapers();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(assessmentPapers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(assessmentPapers.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, assessmentPapers]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % assessmentPapers.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đơn</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center">Mã giấy giám định</th>
                <th className="py-4 px-4 text-center">Người Tạo</th>
                <th className="py-4 px-4 text-center">Ngày tạo</th>
                <th className="py-4 px-4 text-center">Thuộc mẫu</th>
                <th className="py-4 px-4 text-center">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((paper) => (
                <tr key={paper.diamondId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{paper.diamondId}</td>
                  <td className="py-4 px-4 text-center">{paper.accountId}</td>
                  <td className="py-4 px-4 text-center">{paper.dateCreated}</td>
                  <td className="py-4 px-4 text-center">{paper.sampleId}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => navigate(`/assessmentstaff/assessmentpaperlist/${paper.diamondId}`)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Xem chi tiết
                      </button>
                    </div>
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

export default AssessmentPaperList;

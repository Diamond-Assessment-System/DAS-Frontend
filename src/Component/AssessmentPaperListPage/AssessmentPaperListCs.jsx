import "./AssessmentPaperList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import { ASSESSMENT_PAPER_URL } from "../../utils/apiEndPoints";

function AssessmentPaperListCs() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessmentPapers, setAssessmentPapers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [papersResponse, accountsResponse] = await Promise.all([
          axios.get(ASSESSMENT_PAPER_URL),
          axios.get(`http://localhost:8080/api/accounts`),
        ]);
        const sortedPapers = papersResponse.data.sort((a, b) => b.diamondId - a.diamondId);
        setAssessmentPapers(sortedPapers);
        setAccounts(accountsResponse.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAssessmentPapers = assessmentPapers.filter(paper => {
    const account = accounts.find(account => account.accountId === paper.accountId);
    return account && (
      (account.phone?.includes(searchQuery) || '') ||
      (account.email?.includes(searchQuery) || '')
    );
  });

  const getAccountName = (accountId) => {
    const account = accounts.find(account => account.accountId === accountId);
    return account ? account.displayName : 'Unknown';
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
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by phone number or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
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
              {filteredAssessmentPapers.map((paper) => (
                <tr key={paper.diamondId} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{paper.diamondId}</td>
                  <td className="py-4 px-4 text-center">{getAccountName(paper.accountId)}</td>
                  <td className="py-4 px-4 text-center">{paper.dateCreated}</td>
                  <td className="py-4 px-4 text-center">{paper.sampleId}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => navigate(`/consultingstaff/assessmentpaperlist/${paper.diamondId}`)}
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
      </div>
    </div>
  );
}

export default AssessmentPaperListCs;

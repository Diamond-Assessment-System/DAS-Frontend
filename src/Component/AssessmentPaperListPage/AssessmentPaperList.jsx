import "./AssessmentPaperList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function AssessmentPaperList() {
  const navigate = useNavigate();

  const [assessmentPapers, setAssessmentPapers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/assessment-papers")
      .then(response => {
        setAssessmentPapers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the assessment papers!", error);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đơn</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center">Mã giấy giám định</th>
                <th className="py-4 px-4 text-center">Người Tạo</th>
                <th className="py-4 px-4 text-center">Ngày tạo</th>
                <th className="py-4 px-4 text-center">Thuộc mẫu</th>
                <th className="py-4 px-4 text-center">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {assessmentPapers.map((paper) => (
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
      </div>
    </div>
  );
}

export default AssessmentPaperList;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { getAssessmentPaperDetaillUrl } from "../../utils/apiEndPoints";

function AssessmentPaperDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [assessmentPaper, setAssessmentPaper] = useState(null);

  useEffect(() => {
    const fetchAssessmentPaper = async () => {
      try {
       //const response = await axios.get(`https://das-backend.fly.dev/api/assessment-papers/${id}`);
        const response = await axios.get(getAssessmentPaperDetaillUrl(id));
        setAssessmentPaper(response.data);
      } catch (error) {
        console.error("Error fetching assessment paper:", error);
      } finally{
        setLoading(false);
      } 
    };
    fetchAssessmentPaper();
  }, [id]);

  // const downloadImage = () => {
  //   if (window.confirm("Bạn có chắc chắn muốn tải không?")) {
  //     const link = document.createElement("a");
  //     link.href = assessmentPaper.paperImage;
  //     link.download = "AssessmentPaperDetail.png";
  //     link.click();
  //   }
  //   // const link = document.createElement("a");
  //   // link.href = assessmentPaper.paperImage;
  //   // link.download = "AssessmentPaperDetail.png";
  //   // link.click();
  // };

  // if (!assessmentPaper) {
  //   return <div>Loading...</div>;
  // }
  const downloadImage = async () => {
    if (window.confirm("Bạn có chắc chắn muốn tải không?")) {
      try {
        // Giả sử assessmentPaper chứa thông tin cần thiết bao gồm cả ID và tên file gốc
        const fileName = `AssessmentPaper_${assessmentPaper.id}_${assessmentPaper.originalFileName}.pdf`;
  
        const response = await axios.get(`https://das-backend.fly.dev/api/assessment-papers/download/${fileName}`, {
          responseType: 'blob', // Đảm bảo nhận về dữ liệu nhị phân
        });
  
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading the image:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }
  
  return (
    <div id="assessment-paper-detail" className="p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Assessment Paper Images</h1>
      <div className="flex justify-center items-center">
        {assessmentPaper.paperImage && (
          <img src={assessmentPaper.paperImage} alt="paperImage" className="mb-4 w-full md:w-3/4 lg:w-1/2" />
        )}
      </div>
      <button onClick={downloadImage} className="p-3 bg-orange-500 text-white font-bold rounded-md mt-4">
        Download Image
      </button>
    </div>
  );
}

export default AssessmentPaperDetail;

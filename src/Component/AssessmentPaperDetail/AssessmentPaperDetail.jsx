import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AssessmentPaperDetail() {
  const { id } = useParams();
  const [assessmentPaper, setAssessmentPaper] = useState(null);

  useEffect(() => {
    const fetchAssessmentPaper = async () => {
      try {
        const response = await axios.get(`https://das-backend.fly.dev/api/assessment-papers/${id}`);
        setAssessmentPaper(response.data);
      } catch (error) {
        console.error("Error fetching assessment paper:", error);
      }
    };
    fetchAssessmentPaper();
  }, [id]);

  const downloadImage = () => {
    if (window.confirm("Bạn có chắc chắn muốn tải không?")) {
      const link = document.createElement("a");
      link.href = assessmentPaper.paperImage;
      link.download = "AssessmentPaperDetail.png";
      link.click();
    }
    // const link = document.createElement("a");
    // link.href = assessmentPaper.paperImage;
    // link.download = "AssessmentPaperDetail.png";
    // link.click();
  };

  if (!assessmentPaper) {
    return <div>Loading...</div>;
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

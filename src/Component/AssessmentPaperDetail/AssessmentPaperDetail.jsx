// src/components/AssessmentPaperDetail/AssessmentPaperDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import { getAssessmentPaperDetaillUrl } from "../../utils/apiEndPoints";
import frontImageFile from '../../assets/Frontimagepaper.png'; // Import the front image from assets

function AssessmentPaperDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [assessmentPaper, setAssessmentPaper] = useState(null);

  useEffect(() => {
    const fetchAssessmentPaper = async () => {
      try {
        const response = await axios.get(getAssessmentPaperDetaillUrl(id));
        const formattedData = {
          ...response.data,
          // dateCreated: format(new Date(response.data.dateCreated), "yyyy/MM/dd - HH:mm:ss")
        };
        setAssessmentPaper(formattedData);
      } catch (error) {
        console.error("Error fetching assessment paper:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssessmentPaper();
  }, [id]);

  const downloadImage = () => {
    if (window.confirm("Bạn có chắc chắn muốn tải không?")) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const frontImage = new Image();
      const backImage = new Image();

      frontImage.src = frontImageFile;
      backImage.src = assessmentPaper.paperImage;

      frontImage.onload = () => {
        // Set canvas size to fit both images
        const width = frontImage.width;
        const height = frontImage.height + backImage.height;
        canvas.width = width;
        canvas.height = height;

        // Draw the front image
        context.drawImage(frontImage, 0, 0, width, frontImage.height);

        // Draw the back image below the front image
        backImage.onload = () => {
          context.drawImage(backImage, 0, frontImage.height, width, backImage.height);

          // Convert canvas to data URL and trigger download
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = 'AssessmentPaperDetail.png';
          link.click();
        };
      };
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  if (!assessmentPaper) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div id="assessment-paper-detail" className="p-10 bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Assessment Paper Images</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="mb-4 w-full md:w-3/4 lg:w-1/2">
          <img src={frontImageFile} alt="Front Image" style={{ width: '100%', height: 'auto', aspectRatio: '70 / 39' }} />
        </div>
        {assessmentPaper.paperImage && (
          <div className="mb-4 w-full md:w-3/4 lg:w-1/2">
            <img src={assessmentPaper.paperImage} alt="Back Image" className="w-full h-auto" />
          </div>
        )}
      </div>
      <button onClick={downloadImage} className="p-3 bg-orange-500 text-white font-bold rounded-md mt-4">
        Download Image
      </button>
    </div>
  );
}

export default AssessmentPaperDetail;

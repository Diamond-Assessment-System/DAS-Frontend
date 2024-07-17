import React from "react";
import { useLocation } from "react-router-dom";
import '../ManagerLayout/CommitmentPaperImage.css';

const CommitmentPaperImage = () => {
    const location = useLocation();
    const { imageUrl } = location.state;

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'CommitmentPaper.png';
        link.click();
    };

    return (
        <div className="paper-image-container">
            <div className="image-wrapper">
                <img src={imageUrl} alt="Commitment Paper" className="paper-image" />
            </div>
            <button onClick={downloadImage} className="download-button">
                Tải Hình Ảnh
            </button>
        </div>
    );
};

export default CommitmentPaperImage;

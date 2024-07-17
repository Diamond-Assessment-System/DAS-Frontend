import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../ManagerLayout/CommitmentPaperImage.css';
import { useNavigate } from "react-router-dom";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const CommitmentPaperImage = () => {
    const location = useLocation();
    const { imageUrl } = location.state;
    const navigate = useNavigate();

    useEffect(() => {
        const account = handleSession(navigate);
        if (!account) {
            navigate(`/login`);
        }
        if (checkRole(account.accountId) != 4 || checkRole(account.accountId) != 6){
            navigate(`/nopermission`);
        };
    
    }, []);


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

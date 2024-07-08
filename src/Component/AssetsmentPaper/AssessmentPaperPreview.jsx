import React, { useRef, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AssetsmentPaper/AssetsmentPaper.css";
import { format } from "date-fns";

const AssessmentPaperPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    id,
    loai,
    trangThai,
    xuatXu,
    measurement,
    carat,
    colorGrade,
    clarityGrade,
    cutGrade,
    size,
    shape,
    cuttingStyle,
    polish,
    symmetry,
    fluorescence,
    uploadedProportionImage,
    uploadedClarityImage,
    loggedAccount,
  } = location.state || {};
  const reportRef = useRef(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(format(new Date(), "yyyy/MM/dd - HH:mm:ss"));

    const generateImageAndQrCode = async () => {
      try {
        const sectionTitles = reportRef.current.querySelectorAll(".section-title");
        sectionTitles.forEach((title) =>
          title.classList.add("section-title-download")
        );

        const canvas = await html2canvas(reportRef.current);

        sectionTitles.forEach((title) =>
          title.classList.remove("section-title-download")
        );

        const paperImage = canvas.toDataURL("image/png");

        const uploadedImageUrl = await simulateUpload(paperImage, id);
        setGeneratedImageUrl(uploadedImageUrl);

        if (uploadedImageUrl) {
          const qrUrl = await QRCode.toDataURL(uploadedImageUrl);
          setQrCodeUrl(qrUrl);
        }
      } catch (error) {
        console.error("Error generating image or QR code:", error);
      }
    };

    generateImageAndQrCode();
  }, [id]);

  const simulateUpload = async (imageData, id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://your-public-url.com/Assessment_Paper_${id}.png`);
      }, 1000);
    });
  };

  const handleDownload = async () => {
    try {
      const sectionTitles = reportRef.current.querySelectorAll(".section-title");
      sectionTitles.forEach((title) =>
        title.classList.add("section-title-download")
      );

      const canvas = await html2canvas(reportRef.current);

      sectionTitles.forEach((title) =>
        title.classList.remove("section-title-download")
      );

      const paperImage = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = paperImage;
      link.download = `Assessment_Paper_${id}.png`;
      link.click();
    } catch (error) {
      console.error("Error generating image for download:", error);
    }
  };

  const handleSubmit = async () => {
    if (window.confirm("Bạn có chắc chắn muốn Submit không?")) {
        try {
            const sectionTitles = reportRef.current.querySelectorAll(".section-title");
            sectionTitles.forEach((title) =>
                title.classList.add("section-title-download")
            );

            const canvas = await html2canvas(reportRef.current, {
                scrollX: 0,
                scrollY: 0,
                scale: 1,
                windowWidth: document.documentElement.offsetWidth,
                windowHeight: document.documentElement.offsetHeight,
            });

            sectionTitles.forEach((title) =>
                title.classList.remove("section-title-download")
            );

            const paperImage = canvas.toDataURL("image/png");

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob, 'paperImage.png');
                formData.append('assessmentPaperId', parseInt(id)); // Assuming `id` is your sampleId

                try {
                    const uploadResponse = await axios.post(
                        "https://das-backend.fly.dev/api/upload",
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    );
                    const assessmentData = {
                        sampleId: parseInt(id),
                        type: loai,
                        size: parseFloat(size),
                        shape: `${shape} ${cuttingStyle}`,
                        measurement: `${measurement}`,
                        cuttingStyle,
                        color: colorGrade,
                        clarity: clarityGrade,
                        polish,
                        symmetry,
                        fluorescence,
                        weight: parseFloat(carat),
                        dateCreated: format(new Date(), 'yyyy/MM/dd - HH:mm:ss'),
                        paperImage,
                        accountId: loggedAccount.accountId,
                    };

                    const response = await axios.post(
                        "https://das-backend.fly.dev/api/assessment-papers",
                        assessmentData
                    );

                    const status = 3;
                    await axios.put(
                        `https://das-backend.fly.dev/api/booking-samples/${id}/status/${status}`
                    );

                    window.alert("Đã Submit thành công!");
                    console.log("Submission successful:", response.data);
                    navigate("/assessmentstaff");
                } catch (error) {
                    console.error("Error submitting data:", error);
                }
            }, 'image/png');
        } catch (error) {
            console.error("Error generating canvas:", error);
        }
    }
};

  return (
    <Container className="mt-5 report-container">
      <div ref={reportRef}>
        <div className="gold-outline">
          <div className="text-center mb-4">
            <h1 className="report-title">DIAMOND ASSESSMENT REPORT #{id}</h1>
          </div>
          <Row>
            <Col md={4}>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>DAS NATURAL GRADING REPORT</h3>
                  </div>
                  <p>Date assessed: {currentDate}</p>
                  <p>DAS report number: 1234</p>
                  <p>
                    Shape and cutting style: {shape} {cuttingStyle}
                  </p>
                  <p>Measurement: {measurement}</p>
                  <p>Size: {size}</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>GRADING RESULT</h3>
                  </div>
                  <p>Carat Weight: {carat} carat</p>
                  <p>Color Grade: {colorGrade}</p>
                  <p>Clarity Grade: {clarityGrade}</p>
                  <p>Cut Grade: {cutGrade}</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>ADDITIONAL GRADING INFORMATION</h3>
                  </div>
                  <p>Polish: {polish}</p>
                  <p>Symmetry: {symmetry}</p>
                  <p>Fluorescence: {fluorescence}</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>QR CODE</h3>
                  </div>
                  {qrCodeUrl && (
                    <div className="qr-code-container">
                      <img
                        src={qrCodeUrl}
                        alt="QR Code"
                        className="img-fluid"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>PROPORTION</h3>
                  </div>
                  {uploadedProportionImage && (
                    <div className="image-container">
                      <img
                        src={uploadedProportionImage}
                        alt="Proportion"
                        className="uploaded-image"
                      />
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>CLARITY CHARACTERISTICS</h3>
                  </div>
                  {uploadedClarityImage && (
                    <div className="image-container">
                      <img
                        src={uploadedClarityImage}
                        alt="Clarity"
                        className="uploaded-image"
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="mb-4">
                <Col>
                  <div className="section-title">
                    <h3>GRADING SCALE</h3>
                  </div>
                  <img
                    src={"/All-Scales.jpg"}
                    alt="Grading Scale"
                    className="img-fluid"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
      <Row className="mb-4">
        <Col className="flexxx">
          <Button variant="success" onClick={handleDownload} className="downnn">
            Download
          </Button>
          <Button variant="success" onClick={handleSubmit} className="ml-3">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AssessmentPaperPreview;

import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../AssetsmentPaper/AssetsmentPaper.css";
import { handleSession } from "../../utils/sessionUtils";
import { format } from "date-fns";

const AssessmentPaper = () => {
  const location = useLocation();
  const {
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
  } = location.state || {};
  const { id } = useParams();
  const [uploadedProportionImage, setUploadedProportionImage] = useState(null);
  const [uploadedClarityImage, setUploadedClarityImage] = useState(null);
  const navigate = useNavigate();
  const reportRef = useRef(null);

  const [loggedAccount, setLoggedAccount] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
    }
    setCurrentDate(format(new Date(), "yyyy/MM/dd - HH:mm:ss"));
  }, [navigate]);

  const handleProportionImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedProportionImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClarityImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedClarityImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePreview = () => {
    if (uploadedProportionImage && uploadedClarityImage) {
      if (window.confirm("Thông tin đã xác thực?")) {
        navigate(`/assessmentstaff/assessmentbooking/${id}/selection/info/summary/preview`, {
          state: {
            id, loai, trangThai, xuatXu, carat, measurement, colorGrade, clarityGrade, cutGrade, size,
            shape, cuttingStyle, polish, symmetry, fluorescence,
            uploadedProportionImage, uploadedClarityImage, loggedAccount
          }
        });
      }

    } else {
      alert("Please upload both the Proportion and Clarity images before proceeding.");
    }
  };

  return (
    <Container className="mt-5 report-container">
      <div ref={reportRef}>
        <div className="gold-outline">
          <div className="text-center mb-4">
            <h1 className="report-title">DAS REPORT #{id}</h1>
          </div>
          <Row>
            <Col md={4}>
              <Row className="mb-4">
                <Col>
                  <h3 className="section-title">DAS Natural Grading Report</h3>
                  <p>Date assessed: {currentDate}</p>
                  <p>DAS report number: 1234</p>
                  <p>Shape and cutting style: {shape} {cuttingStyle}</p>
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
                  <h3 className="section-title">ADDITIONAL GRADING INFORMATION</h3>
                  <p>Polish: {polish}</p>
                  <p>Symmetry: {symmetry}</p>
                  <p>Fluorescence: {fluorescence}</p>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row className="mb-4">
                <Col>
                  <h3 className="section-title">PROPORTION</h3>
                  <Form.Group className="mt-3">
                    <Form.Control
                      type="file"
                      label="Upload Image"
                      accept="image/*"
                      onChange={handleProportionImageUpload}
                    />
                  </Form.Group>
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
                  <h3 className="section-title">CLARITY CHARACTERISTICS</h3>
                  <Form.Group className="mt-3">
                    <Form.Control
                      type="file"
                      label="Upload Image"
                      accept="image/*"
                      onChange={handleClarityImageUpload}
                    />
                  </Form.Group>
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
                  <h3 className="section-title">GRADING SCALE</h3>
                  <img
                    src={"/src/assets/All-Scales.jpg"}
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
        <Col>
          <Button
            variant="primary"
            onClick={handlePreview}
            disabled={!uploadedProportionImage || !uploadedClarityImage}
          >
            Preview
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AssessmentPaper;

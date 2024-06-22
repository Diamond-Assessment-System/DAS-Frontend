import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios for HTTP requests
import "bootstrap/dist/css/bootstrap.min.css";
import "../AssetsmentPaper/AssetsmentPaper.css";
import { handleSession } from "../../utils/sessionUtils";
import html2canvas from "html2canvas"; // Import html2canvas

const AssessmentPaper = () => {
  const location = useLocation();
  const {
    loai,
    trangThai,
    xuatXu,
    carat,
    colorGrade,
    clarityGrade,
    cutGrade,
    size,
  } = location.state || {};
  const { id } = useParams();
  const [uploadedProportionImage, setUploadedProportionImage] = useState(null);
  const [uploadedClarityImage, setUploadedClarityImage] = useState(null);
  const navigate = useNavigate();
  const reportRef = useRef(null); // Create a ref for the report

  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
    }
  }, [navigate]);

  // Function to handle proportion image upload
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

  // Function to handle clarity image upload
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

  // Function to convert report to image and handle form submission
  const handleSubmit = async () => {
    try {
      // Convert the report to an image
      const canvas = await html2canvas(reportRef.current);
      const paperImage = canvas.toDataURL("image/png");

      // Prepare data object based on AssessmentPaperDto structure
      const assessmentData = {
        sampleId: parseInt(id), // Assuming id is from useParams()
        type: loai,
        size: parseFloat(size),
        shape: "Round Brilliant",
        color: colorGrade,
        clarity: clarityGrade,
        polish: "Excellent", // Hardcoded for example
        symmetry: "Excellent", // Hardcoded for example
        fluorescence: "None", // Hardcoded for example
        weight: parseFloat(carat),
        dateCreated: new Date().toISOString(), // Current date
        paperImage, // Base64 image
        accountId: loggedAccount.accountId, // Example account ID
      };

      // Make POST request to backend
      const response = await axios.post(
        "http://localhost:8080/api/assessment-papers",
        assessmentData
      );

      console.log("Submission successful:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Container className="mt-5 report-container">
      <div className="text-center mb-4">
        <h1 className="report-title">DAS REPORT</h1>
        <h2 className="report-id">{id}</h2> {/* Display id here */}
      </div>
      <Row ref={reportRef}>
        <Col md={4}>
          <Row className="mb-4">
            <Col>
              <h3 className="section-title">DAS Natural Grading Report</h3>
              <p>May 12th, 2024</p>
              <p>DAS report number: 1234</p>
              <p>Shape and cutting style: Round Brilliant</p>
              <p>Measurement: 7.72-7.74x4.54mm</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <h3 className="section-title">GRADING RESULT</h3>
              <p>Carat Weight: {carat} carat</p>
              <p>Color Grade: {colorGrade}</p>
              <p>Clarity Grade: {clarityGrade}</p>
              <p>Cut Grade: {cutGrade}</p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <h3 className="section-title">ADDITIONAL GRADING INFORMATION</h3>
              <p>Polish: Excellent</p>
              <p>Symmetry: Excellent</p>
              <p>Fluorescence: None</p>
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
      {/* Submit button section */}
      <Row className="mb-4">
        <Col>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AssessmentPaper;

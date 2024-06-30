// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Container, Row, Col, Form } from "react-bootstrap";
// import axios from "axios";
// import htmlToImage from 'html-to-image';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../AssetsmentPaper/AssetsmentPaper.css";
// import { handleSession } from "../../utils/sessionUtils";

// const SummaryPage = () => {
//     const { id, sampleId } = useParams();
//     const navigate = useNavigate();
//     const [loggedAccount, setLoggedAccount] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [assessmentData, setAssessmentData] = useState(null);
//     const [uploadedProportionImage, setUploadedProportionImage] = useState(null);
//     const [uploadedClarityImage, setUploadedClarityImage] = useState(null);

//     useEffect(() => {
//         const account = handleSession(navigate);
//         setLoggedAccount(account);

//         // Fetch the assessment data
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`https://das-backend.fly.dev/api/assessmentpapers/${id}`);
//                 setAssessmentData(response.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [navigate, id]);

//     const handleProportionImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setUploadedProportionImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleClarityImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setUploadedClarityImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleSubmit = async () => {
//         setIsSubmitting(true);
//         try {
//             const assessmentPaperDto = {
//                 ...assessmentData,
//                 crossSection: uploadedProportionImage,
//                 longitudinalSection: uploadedClarityImage,
//                 sealId: 3,
//                 accountId: loggedAccount.accountId,
//                 sampleId: sampleId
//             };

//             const response = await axios.post('https://das-backend.fly.dev/api/assessmentpapers', assessmentPaperDto);
//             console.log('Successfully submitted:', response.data);
//         } catch (error) {
//             console.error('Error submitting data:', error);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const downloadImage = () => {
//         const node = document.getElementById('report-container');
//         htmlToImage.toJpeg(node)
//             .then((dataUrl) => {
//                 const link = document.createElement('a');
//                 link.href = dataUrl;
//                 link.download = 'DASREPORT_ASSESSMENTPAPER.jpeg';
//                 document.body.appendChild(link);
//                 link.click();
//                 document.body.removeChild(link);
//             })
//             .catch((error) => {
//                 console.error('Error generating image:', error);
//             });
//     };

//     if (!assessmentData) {
//         return <div>Loading...</div>;
//     }

//     const {
//         loai, trangThai, xuatXu, carat, colorGrade, clarityGrade, cutGrade, size,
//         depthPercentage, tablePercentage, crownAngle, pavilionAngle, culetSize,
//         girdleThickness, crownHeight, totalDepth, pavilionDepth, symmetry, images
//     } = assessmentData;

//     return (
//         <Container id="report-container" className="mt-5 report-container">
//             <div className="text-center mb-4">
//                 <h1 className="report-title">DAS REPORT</h1>
//                 <h2 className="report-id">{id}</h2>
//             </div>
//             <Row>
//                 <Col md={4}>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">DAS Natural Grading Report</h3>
//                             <p>{new Date().toLocaleDateString()}</p>
//                             <p>DAS report number: {id}</p>
//                             <p>Shape and cutting style: {loai}</p>
//                             <p>Measurement: {size}</p>
//                         </Col>
//                     </Row>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">GRADING RESULT</h3>
//                             <p>Carat Weight: {carat} carat</p>
//                             <p>Color Grade: {colorGrade}</p>
//                             <p>Clarity Grade: {clarityGrade}</p>
//                             <p>Cut Grade: {cutGrade}</p>
//                         </Col>
//                     </Row>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">ADDITIONAL GRADING INFORMATION</h3>
//                             <p>Polish: Excellent</p>
//                             <p>Symmetry: {symmetry}</p>
//                             <p>Fluorescence: None</p>
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col md={4}>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">PROPORTION</h3>
//                             <Form.Group className="mt-3">
//                                 <Form.Control
//                                     type="file"
//                                     label="Upload Image"
//                                     accept="image/*"
//                                     onChange={handleProportionImageUpload}
//                                 />
//                             </Form.Group>
//                             {uploadedProportionImage && (
//                                 <div className="image-container">
//                                     <img
//                                         src={uploadedProportionImage}
//                                         alt="Proportion"
//                                         className="uploaded-image"
//                                     />
//                                 </div>
//                             )}
//                         </Col>
//                     </Row>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">CLARITY CHARACTERISTICS</h3>
//                             <Form.Group className="mt-3">
//                                 <Form.Control
//                                     type="file"
//                                     label="Upload Image"
//                                     accept="image/*"
//                                     onChange={handleClarityImageUpload}
//                                 />
//                             </Form.Group>
//                             {uploadedClarityImage && (
//                                 <div className="image-container">
//                                     <img
//                                         src={uploadedClarityImage}
//                                         alt="Clarity"
//                                         className="uploaded-image"
//                                     />
//                                 </div>
//                             )}
//                         </Col>
//                     </Row>
//                 </Col>
//                 <Col md={4}>
//                     <Row className="mb-4">
//                         <Col>
//                             <h3 className="section-title">GRADING SCALE</h3>
//                             <img
//                                 src={"./src/assets/All-Scales.jpg"}
//                                 alt="Grading Scale"
//                                 className="img-fluid"
//                             />
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//             <div className="button-container text-center">
//                 <button onClick={downloadImage} className="download-image btn btn-danger">
//                     Tải về Hình Ảnh
//                 </button>
//                 <button onClick={handleSubmit} disabled={isSubmitting} className="submit-report btn btn-primary ml-3">
//                     {isSubmitting ? 'Đang Tạo Báo Cáo...' : 'Tạo Báo Cáo'}
//                 </button>
//             </div>
//         </Container>
//     );
// };

// export default SummaryPage;

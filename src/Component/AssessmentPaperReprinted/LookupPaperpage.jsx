import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LookupPaperpage.css'; // Import the custom CSS file
import Spinner from "../Spinner/Spinner";
import { getAssessmentPaperUrl } from "../../utils/apiEndPoints";
import frontImageFile from '../../assets/Frontimagepaper.png'; // Import the front image from assets

const LookupPaperpage = () => {
    const [diamondCode, setDiamondCode] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [imageData, setImageData] = useState(null); // State to hold base64 image data

    const handleSubmit = async (e, productCode) => {
        e.preventDefault();

        try {
            const response = await axios.get(getAssessmentPaperUrl(productCode));
            const data = response.data;

            if (data) {
                setImageData(data.paperImage); // Store base64 encoded image data
                setSearchResult(`Kết quả tìm kiếm cho mã giám định: ${productCode}`);
            } else {
                setSearchResult(`Không tìm thấy sản phẩm với mã giám định: ${productCode}`);
                setImageData(null); // Clear image data if not found
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setSearchResult('Đã xảy ra lỗi khi tìm kiếm sản phẩm.');
            setImageData(null); // Clear image data on error
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print Report</title>');
        printWindow.document.write('<style>@media print { @page { size: A4 landscape; margin: 0; } body { margin: 0; display: flex; flex-direction: column; align-items: center; } .print-image { width: 297mm; height: 210mm; object-fit: contain; } }</style>');
        printWindow.document.write('</head><body>');

        const frontImage = new Image();
        const backImage = new Image();
        frontImage.src = frontImageFile;
        backImage.src = imageData;

        frontImage.onload = () => {
            printWindow.document.write(`<div style="page-break-after: always;"><img src="${frontImageFile}" alt="Front Image" class="print-image"></div>`);
            backImage.onload = () => {
                printWindow.document.write(`<div><img src="${imageData}" alt="Back Image" class="print-image"></div>`);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            };
        };
    };

    return (
        <Container className="mt-5">
            <h5 className="text-center">Tìm Kiếm</h5>
            <div className="search-form bg-light p-4 rounded">
                <Form onSubmit={(e) => handleSubmit(e, diamondCode)} className="mb-3">
                    <h5>Nhập Mã Giấy Giám Định</h5>
                    <Row>
                        <Col md={8}>
                            <Form.Group controlId="diamondCode">
                                <Form.Control
                                    type="text"
                                    value={diamondCode}
                                    onChange={(e) => setDiamondCode(e.target.value)}
                                    placeholder="Nhập số sản phẩm"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4} className="align-self-end">
                            <Button variant="primary" type="submit" block>
                                Truy Xuất
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <p className="mt-3 text-muted">
                    LƯU Ý QUAN TRỌNG: Chỉ Download Khi Khách Hàng Đến Trực Tiếp Để Cấp Lại Giấy
                </p>
            </div>
            {searchResult && <Alert variant="info" className="mt-4">{searchResult}</Alert>}
            {imageData && (
                <div className="mt-4">
                    <img src={frontImageFile} alt="Front Image" style={{ maxWidth: '100%' }} />
                    <img src={imageData} alt="Back Image" style={{ maxWidth: '100%', marginTop: '10px' }} />
                    <Button variant="success" className="mt-3" onClick={handlePrint}>
                        Print Report
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default LookupPaperpage;

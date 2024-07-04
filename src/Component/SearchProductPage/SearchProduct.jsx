import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchProduct.css'; // Import the custom CSS file
import Spinner from "../Spinner/Spinner";
import { getAssessmentPaperUrl } from "../../utils/apiEndPoints";

const ProductSearch = () => {
    const [diamondCode, setDiamondCode] = useState('');
    const [gemstoneCode, setGemstoneCode] = useState('');
    const [jadeCode, setJadeCode] = useState('');
    const [pearlCode, setPearlCode] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [imageData, setImageData] = useState(null); // State to hold base64 image data
    //const [loading, setLoading] = useState(true);

    const handleSubmit = async (e, productCode) => {
        e.preventDefault();

        try {
            // Perform API call to fetch the assessment paper based on product code
            //const response = await axios.get(`https://das-backend.fly.dev/api/assessment-papers/${productCode}`);
            const response = await axios.get(getAssessmentPaperUrl(productCode));
            const data = response.data;

            // Update states based on API response
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
        // finally {
        //     setLoading(false);
        //   }
    };

    // if (loading) {
    //     return (
    //       <div className="loading-indicator">
    //         <Spinner />
    //       </div>
    //     );
    //   }

    return (
        <Container className="mt-5">
            <h1 className="text-center">Tra cứu thông tin sản phẩm</h1>
            <p className="text-center">
                Đây là dịch vụ tra cứu của PNJL nhằm mục đích mang đến cho quý khách hàng sự tiện lợi, nhanh chóng và chính xác về những thông tin của sản phẩm trên bảng giám định đúng với những thông tin lưu trong cơ sở dữ liệu của PNJL.
            </p>
            <div className="search-form bg-light p-4 rounded">
                <Form onSubmit={(e) => handleSubmit(e, diamondCode)} className="mb-3">
                    <h5>Kim Cương</h5>
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
                <Form onSubmit={(e) => handleSubmit(e, gemstoneCode)} className="mb-3">
                    <h5>Đá Màu</h5>
                    <Row>
                        <Col md={8}>
                            <Form.Group controlId="gemstoneCode">
                                <Form.Control
                                    type="text"
                                    value={gemstoneCode}
                                    onChange={(e) => setGemstoneCode(e.target.value)}
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
                <Form onSubmit={(e) => handleSubmit(e, jadeCode)} className="mb-3">
                    <h5>Cẩm Thạch</h5>
                    <Row>
                        <Col md={8}>
                            <Form.Group controlId="jadeCode">
                                <Form.Control
                                    type="text"
                                    value={jadeCode}
                                    onChange={(e) => setJadeCode(e.target.value)}
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
                <Form onSubmit={(e) => handleSubmit(e, pearlCode)}>
                    <h5>Ngọc Trai</h5>
                    <Row>
                        <Col md={8}>
                            <Form.Group controlId="pearlCode">
                                <Form.Control
                                    type="text"
                                    value={pearlCode}
                                    onChange={(e) => setPearlCode(e.target.value)}
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
                    LƯU Ý QUAN TRỌNG: Bảng tham khảo này chỉ nhằm mục đích giúp xác nhận số kiểm định (Number) do người sử dụng dịch vụ này cung cấp tương ứng với số kiểm định được lưu trữ tại nguồn dữ liệu của PNJL. Bảng tham khảo này không phải là giấy bảo hành, đánh giá hay định giá viên kim cương đính kèm và cũng không được xem như là một bảng giám định gốc của PNJL.
                </p>
            </div>
            {searchResult && <Alert variant="info" className="mt-4">{searchResult}</Alert>}
            {imageData && (
                <div className="mt-4">
                    <img src={imageData} alt="Product" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </Container>
    );
};

export default ProductSearch;

import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductSearch = () => {
    const [productCode, setProductCode] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [imageData, setImageData] = useState(null); // State to hold base64 image data

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Perform API call to fetch the assessment paper based on product code
            const response = await axios.get(`http://localhost:8080/api/assessment-papers/${productCode}`);
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
    };

    return (
        <Container>
            <h1 className="mt-5">Tra cứu thông tin sản phẩm</h1>
            <p>
                Đây là dịch vụ tra cứu của PNJL nhằm mục đích mang đến cho quý khách hàng sự tiện lợi, nhanh chóng và chính xác về những thông tin của sản phẩm trên bảng giám định đúng với những thông tin lưu trong cơ sở dữ liệu của PNJL.
            </p>
            <Form onSubmit={handleSubmit} className="d-flex mt-4">
                <Form.Group controlId="productCode" className="mr-2 flex-grow-1">
                    <Form.Label>Mã giám định</Form.Label>
                    <Form.Control
                        type="text"
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                        placeholder="Nhập mã giám định"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="align-self-end">
                    Tra cứu
                </Button>
            </Form>
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

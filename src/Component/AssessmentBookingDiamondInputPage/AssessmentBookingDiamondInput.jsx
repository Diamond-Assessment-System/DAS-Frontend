import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './AssessmentBookingDiamondInput.css';
import axios from 'axios';

const AssessmentBookingDiamondInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, serviceData, numberOfSamples, id } = location.state || {}; 
  const [form] = Form.useForm();

  const [diamondPrices, setDiamondPrices] = useState([]);
  const [service, setService] = useState(serviceData);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const fetchDiamondPrices = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/service-price-lists");
        setDiamondPrices(response.data);
      } catch (error) {
        console.error("Error fetching the prices:", error);
      }
    };

    fetchDiamondPrices();
  }, []);

  const calculatePrice = (size) => {
    const { servicePrice } = service;
    const priceData = diamondPrices.find(price => size >= price.sizeFrom && size <= price.sizeTo);

    if (priceData) {
      const { initPrice, sizeFrom, priceUnit } = priceData;
      const price = servicePrice + initPrice + (size - sizeFrom) * priceUnit;
      return Math.round(price);
    }

    return 'N/A';
  };

  const handleFormChange = (changedValues, allValues) => {
    const updatedSamples = [];
    for (let i = 0; i < numberOfSamples; i++) {
      const sampleSize = parseFloat(allValues[`diamond${i + 1}Size`] || 0);
      const price = calculatePrice(sampleSize);
      const priceId = parseInt(allValues[`diamond${i + 1}ServicePriceId`] || 0);
      updatedSamples.push({
        name: `Mẫu ${i + 1}`,
        size: sampleSize,
        price: price,
        isDiamond: 1,
        status: 1,
        servicePriceId: priceId,
      });
    }
    setSamples(updatedSamples);
  };

  const renderDiamondFields = () => {
    const diamondFields = [];
    for (let i = 0; i < numberOfSamples; i++) {
      diamondFields.push(
        <Col span={8} key={i}>
          <div className="diamond-field">
            <Form.Item label={`Tên mẫu`}>
              <Input disabled value={`Mẫu ${i + 1}`} />
            </Form.Item>
            <Form.Item
              label="Kích cỡ"
              name={`diamond${i + 1}Size`}
              rules={[{ required: true, message: 'Nhập kích cỡ!' }]}
            >
              <Input onChange={(e) => {
                const size = parseFloat(e.target.value);
                const price = calculatePrice(size);
                form.setFieldsValue({ [`diamond${i + 1}Price`]: price });
              }} />
            </Form.Item>
            <Form.Item label="Số tiền ước tính" name={`diamond${i + 1}Price`}>
              <Input disabled />
            </Form.Item>
            <Form.Item label="ID Giá Dịch Vụ" name={`diamond${i + 1}ServicePriceId`} hidden>
              <Input /> {/* Input field for servicePriceId */}
            </Form.Item>
          </div>
        </Col>
      );
    }
    return diamondFields;
  };

  const handleNextClick = () => {
    navigate('/consultingstaff/assessmentrequest/' + id + '/inputdiamonds/summary', {
      state: {
        diamonds: samples,
        bookingData,
        serviceData
      }
    });
  };

  return (
    <div className="assessment-booking-diamond-input">
      <Form
        form={form}
        onValuesChange={handleFormChange}
        layout="vertical"
        style={{ maxWidth: '90%', margin: '0 auto' }}
      >
        <Row gutter={24}>
          {renderDiamondFields()}
        </Row>
        <Button type="primary" onClick={handleNextClick} className="small-button">
            Tiếp theo
          </Button>
      </Form>
      
    </div>
  );
};

export default AssessmentBookingDiamondInput;

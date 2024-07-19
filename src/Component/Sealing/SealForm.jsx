import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, InputNumber, Button, Typography, Row, Col, Select } from 'antd';
import { changeSampleStatus } from '../../utils/changeSampleStatus';

const { Title } = Typography;
const { Option } = Select;

function SealForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const sample = location.state?.sample || {};
  const bookingId = location.state?.bookingId;

  const handleSubmit = async (values) => {
    const sampleData = { ...sample, ...values, status: 3 }; // Update status to indicate it has been sealed and completed
    let selectedSamples = JSON.parse(localStorage.getItem('selectedSamples')) || [];
    selectedSamples.push(sampleData);
    localStorage.setItem('selectedSamples', JSON.stringify(selectedSamples));

    try {
      await changeSampleStatus(sample.sampleId, 3); // Change status to 3 (completed)
      console.log('Form data submitted:', sampleData);
      navigate('/assessmentstaff/assessmentbooking', { state: { bookingId } });
    } catch (error) {
      console.error('Error updating sample status:', error);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="p-12 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-12"
    >
      <div className="text-center mb-8">
        <Title level={2} className="text-gray-700">
          Điền Thông Tin Kim Cương
        </Title>
      </div>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Weight</span>}
            name="weight"
            rules={[{ required: true, message: 'Vui lòng điền trọng lượng!' }]}
            className="mb-6"
          >
            <InputNumber
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền trọng lượng"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Size</span>}
            name="size"
            rules={[{ required: true, message: 'Vui lòng điền kích cỡ!' }]}
            className="mb-6"
          >
            <InputNumber
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền kích cỡ"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Shape</span>}
            name="shape"
            rules={[{ required: true, message: 'Vui lòng chọn hình dạng!' }]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Chọn hình dạng"
            >
              {[
                "Round",
                "Princess",
                "Emerald",
                "Asscher",
                "Marquise",
                "Oval",
                "Radiant",
                "Pear",
                "Heart",
                "Cushion",
              ].map((shape) => (
                <Option key={shape} value={shape}>
                  {shape}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Color</span>}
            name="color"
            rules={[{ required: true, message: 'Vui lòng chọn màu sắc!' }]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Chọn màu sắc"
            >
              {[
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
              ].map((color) => (
                <Option key={color} value={color}>
                  {color}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Clarity</span>}
            name="clarity"
            rules={[{ required: true, message: 'Vui lòng chọn độ tinh khiết!' }]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Chọn độ tinh khiết"
            >
              {[
                "Flawless",
                "Internally Flawless",
                "VVS1",
                "VVS2",
                "VS1",
                "VS2",
                "SI1",
                "SI2",
                "I1",
                "I2",
                "I3",
              ].map((clarity) => (
                <Option key={clarity} value={clarity}>
                  {clarity}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className="text-center">
        <Button
          type="primary"
          htmlType="submit"
          className="mt-4 w-40 text-lg py-2"
        >
          Submit
        </Button>
        <Button
          type="default"
          onClick={() => navigate('/assessmentstaff/assessmentbooking', { state: { bookingId } })}
          className="mt-4 w-40 text-lg py-2 ml-4"
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SealForm;

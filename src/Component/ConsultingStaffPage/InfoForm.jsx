import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, InputNumber, Button, Typography, Select, Row, Col } from "antd";
import "./InfoForm.css";

const { Title } = Typography;
const { Option } = Select;

function InfoForm() {
  const [carat, setCarat] = useState(0);
  const [colorGrade, setColorGrade] = useState("");
  const [clarityGrade, setClarityGrade] = useState("");
  const [cutGrade, setCutGrade] = useState("");
  const [size, setSize] = useState(0);
  const [shape, setShape] = useState("");
  const [cuttingStyle, setCuttingStyle] = useState("");
  const [polish, setPolish] = useState("");
  const [symmetry, setSymmetry] = useState("");
  const [fluorescence, setFluorescence] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loai, trangThai, xuatXu } = location.state || {};

  const handleSubmit = () => {
    const reportData = {
      loai,
      trangThai,
      xuatXu,
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
    };

    navigate(
      `/assessmentstaff/assessmentbooking/${id}/selection/info/summary`,
      { state: reportData }
    );
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="p-12 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-12"
    >
      <div className="text-center mb-8">
        <Title level={2} className="text-gray-700">
          Thông tin kim cương
        </Title>
      </div>
      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Carat Weight</span>}
            name="carat"
            rules={[
              { required: true, message: "Vui lòng điền trọng lượng carat!" },
            ]}
            className="mb-6"
          >
            <InputNumber
              value={carat}
              onChange={(value) => setCarat(value)}
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền trọng lượng carat"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Size</span>}
            name="size"
            rules={[
              { required: true, message: "Vui lòng điền kích cỡ kim cương!" },
            ]}
            className="mb-6"
          >
            <InputNumber
              value={size}
              onChange={(value) => setSize(value)}
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền kích cỡ kim cương"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Color Grade</span>}
            name="colorGrade"
            rules={[{ required: true, message: "Vui lòng điền lớp màu!" }]}
            className="mb-6"
          >
            <Select
              value={colorGrade}
              onChange={(value) => setColorGrade(value)}
              className="w-full text-lg"
              placeholder="Điền lớp màu"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
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
              ].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Clarity Grade</span>}
            name="clarityGrade"
            rules={[{ required: true, message: "Vui lòng điền độ tinh khiết!" }]}
            className="mb-6"
          >
            <Select
              value={clarityGrade}
              onChange={(value) => setClarityGrade(value)}
              className="w-full text-lg"
              placeholder="Điền độ tinh khiết"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
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
              ].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Cut Grade</span>}
            name="cutGrade"
            rules={[{ required: true, message: "Vui lòng điền cắt lớp!" }]}
            className="mb-6"
          >
            <Select
              value={cutGrade}
              onChange={(value) => setCutGrade(value)}
              className="w-full text-lg"
              placeholder="Điền cắt lớp"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Shape</span>}
            name="shape"
            rules={[{ required: true, message: "Vui lòng chọn hình dạng!" }]}
            className="mb-6"
          >
            <Select
              value={shape}
              onChange={(value) => setShape(value)}
              className="w-full text-lg"
              placeholder="Chọn hình dạng"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
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
      </Row>

      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Cutting Style</span>}
            name="cuttingStyle"
            rules={[{ required: true, message: "Vui lòng chọn giác cắt kim cương!" }]}
            className="mb-6"
          >
            <Select
              value={cuttingStyle}
              onChange={(value) => setCuttingStyle(value)}
              className="w-full text-lg"
              placeholder="Chọn giác cắt kim cương"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
            >
              {["Brilliant", "Step", "Mixed"].map((style) => (
                <Option key={style} value={style}>
                  {style}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Polish</span>}
            name="polish"
            rules={[{ required: true, message: "Vui lòng chọn độ bóng!" }]}
            className="mb-6"
          >
            <Select
              value={polish}
              onChange={(value) => setPolish(value)}
              className="w-full text-lg"
              placeholder="Chọn độ bóng"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Symmetry</span>}
            name="symmetry"
            rules={[{ required: true, message: "Vui lòng chọn độ đối xứng!" }]}
            className="mb-6"
          >
            <Select
              value={symmetry}
              onChange={(value) => setSymmetry(value)}
              className="w-full text-lg"
              placeholder="Chọn độ đối xứng"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Fluorescence</span>}
            name="fluorescence"
            rules={[{ required: true, message: "Vui lòng chọn huỳnh quang!" }]}
            className="mb-6"
          >
            <Select
              value={fluorescence}
              onChange={(value) => setFluorescence(value)}
              className="w-full text-lg"
              placeholder="Chọn huỳnh quang"
              dropdownRender={(menu) => (
                <div className="shadow-lg">{menu}</div>
              )}
            >
              {["None", "Faint", "Medium", "Strong", "Very Strong"].map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
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
          Tiếp theo
        </Button>
      </Form.Item>
    </Form>
  );
}

export default InfoForm;

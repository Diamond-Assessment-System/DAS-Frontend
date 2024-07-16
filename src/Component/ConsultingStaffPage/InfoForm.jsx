import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Form, InputNumber, Button, Typography, Select, Row, Col } from "antd";
import "./InfoForm.css";

const { Title } = Typography;
const { Option } = Select;

function InfoForm() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loai, trangThai, xuatXu, measurement } = location.state || {};

  const handleSubmit = (values) => {
    const reportData = {
      ...values,
      loai,
      trangThai,
      xuatXu,
      measurement,
    };
    if (window.confirm("Bạn có chắc chắn muốn tiếp tục không?")) {
      navigate(
        `/assessmentstaff/assessmentbooking/${id}/selection/info/summary`,
        { state: reportData }
      );
    }
  };

  return (
    <Form
      form={form}
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
              {
                type: "number",
                min: 0,
                message: "Trọng lượng carat phải lớn hơn hoặc bằng 0!",
              },
            ]}
            className="mb-6"
          >
            <InputNumber
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền trọng lượng carat"
              parser={(value) => value.replace(/[^0-9.]/g, "")}
              formatter={(value) => value.replace(/[^0-9.]/g, "")}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Size</span>}
            name="size"
            rules={[
              { required: true, message: "Vui lòng điền kích cỡ kim cương!" },
              {
                type: "number",
                min: 0,
                message: "Kích cỡ phải lớn hơn hoặc bằng 0!",
              },
            ]}
            className="mb-6"
          >
            <InputNumber
              className="w-full text-lg custom-input"
              min={0}
              step={0.01}
              placeholder="Điền kích cỡ kim cương"
              parser={(value) => value.replace(/[^0-9.]/g, "")}
              formatter={(value) => value.replace(/[^0-9.]/g, "")}
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
              className="w-full text-lg"
              placeholder="Điền lớp màu"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
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
            rules={[
              { required: true, message: "Vui lòng điền độ tinh khiết!" },
            ]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Điền độ tinh khiết"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
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
              className="w-full text-lg"
              placeholder="Điền cắt lớp"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map(
                (grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                )
              )}
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
              className="w-full text-lg"
              placeholder="Chọn hình dạng"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
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
            rules={[
              { required: true, message: "Vui lòng chọn giác cắt kim cương!" },
            ]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Chọn giác cắt kim cương"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
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
              className="w-full text-lg"
              placeholder="Chọn độ bóng"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map(
                (grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            label={<span className="font-bold text-lg">Symmetry</span>}
            name="symmetry"
            rules={[{ required: true, message: "Vui lòng chọn độ đối xứng!" }]}
            className="mb-6"
          >
            <Select
              className="w-full text-lg"
              placeholder="Chọn độ đối xứng"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
            >
              {["Excellent", "Very Good", "Good", "Fair", "Poor"].map(
                (grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                )
              )}
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
              className="w-full text-lg"
              placeholder="Chọn huỳnh quang"
              dropdownRender={(menu) => <div className="shadow-lg">{menu}</div>}
            >
              {["None", "Faint", "Medium", "Strong", "Very Strong"].map(
                (grade) => (
                  <Option key={grade} value={grade}>
                    {grade}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Col span={24}>
        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            className="mt-4 w-full text-lg  "
          >
            Tiếp theo
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
}

export default InfoForm;

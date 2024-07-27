import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, InputNumber, Button, Typography, Select, Row, Col, Radio, Modal, Input } from "antd";
import axios from "axios";
import { cancelSample } from "../../utils/changeSampleStatus";
import "./InfoForm.css";

const { Title } = Typography;
const { Option } = Select;

function InfoForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loai, setLoai] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const handleLoaiChange = (e) => {
    const value = e.target.value;
    setLoai(value);
    if (value === "Diamond-Like") {
      setIsDisabled(true);
      setCancelReason("Diamond-Like");
    } else {
      setIsDisabled(false);
      setCancelReason("");
    }
  };

  const handleCancelOk = async () => {
    if (cancelReason) {
      try {
        await cancelSample(id, JSON.stringify(cancelReason));
        setIsCancelModalVisible(false);
        setIsSuccessModalVisible(true);
      } catch (error) {
        console.error("Error updating status:", error);
        Modal.error({ title: 'Error', content: 'Có lỗi xảy ra khi cập nhật trạng thái.' });
      }
    } else {
      Modal.error({ title: 'Error', content: 'Please provide a reason to cancel.' });
    }
  };

  const handleCancelCancel = () => {
    setIsCancelModalVisible(false);
    setCancelReason("");
  };

  const handleSuccessOk = () => {
    setIsSuccessModalVisible(false);
    navigate("/assessmentstaff");
  };

  const handleSubmit = (values) => {
    const reportData = {
      ...values,
      loai,
      trangThai,
      xuatXu,
      measurement,
    };
    if (window.confirm("Bạn có chắc chắn muốn tiếp tục không?")) {
      navigate(`/assessmentstaff/assessmentbooking/${id}/info/summary`, { state: reportData });
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      className="p-12 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-12"
      initialValues={{ loai, trangThai, xuatXu, measurement }}
    >
      <div className="text-center mb-8">
        <Title level={2} className="text-gray-700">
          Thuộc Tính
        </Title>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Type</span>}
            name="loai"
            rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
            className="mb-6"
          >
            <Radio.Group
              onChange={handleLoaiChange}
              value={loai}
              className="flex space-x-4"
            >
              <Radio value="Diamond" className="text-lg">
                Diamond
              </Radio>
              <Radio value="Diamond-Like" className="text-lg">
                Diamond-Like
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Status</span>}
            name="trangThai"
            rules={[{ required: !isDisabled, message: "Vui lòng chọn trạng thái!" }]}
            className="mb-6"
          >
            <Radio.Group
              onChange={(e) => setTrangThai(e.target.value)}
              value={trangThai}
              disabled={isDisabled}
              className="flex space-x-4"
            >
              <Radio value="Processed" className="text-lg">
                Processed
              </Radio>
              <Radio value="Not Processed" className="text-lg">
                Not Processed
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Origin</span>}
            name="xuatXu"
            rules={[{ required: !isDisabled, message: "Vui lòng chọn xuất xứ!" }]}
            className="mb-6"
          >
            <Radio.Group
              onChange={(e) => setXuatXu(e.target.value)}
              value={xuatXu}
              disabled={isDisabled}
              className="flex space-x-4"
            >
              <Radio value="Natural" className="text-lg">
                Natural
              </Radio>
              <Radio value="Non-Natural" className="text-lg">
                Non-Natural
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Measurement</span>}
            name="measurement"
            rules={[{ required: !isDisabled, message: "Vui lòng nhập kích thước!" }]}
            className="mb-6"
          >
            <Input
              placeholder="Enter measurement (e.g., 3.35-3.7x4.1 mm)"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              disabled={isDisabled}
            />
          </Form.Item>
        </Col>
      </Row>
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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
              disabled={isDisabled}
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

      <Row>
        <Col span={12}>
          <Form.Item className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="mt-4 w-full text-lg"
              disabled={isDisabled}
            >
              Tiếp theo
            </Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item className="text-center">
            <Button
              type="danger"
              className="mt-4 w-full text-lg"
              onClick={() => {
                setIsCancelModalVisible(true);
              }}
              disabled={loai !== "Diamond-Like"}
            >
              Kết thúc
            </Button>

          </Form.Item>
          <p><a href="https://doji.vn/5-cach-nhan-biet-kim-cuong-that-gia/" target="_blank" class="custom-link">Cách nhận biết kim cương</a></p>
        </Col>
      </Row>

      <Modal
        title="Reason for Cancellation"
        visible={isCancelModalVisible}
        onOk={handleCancelOk}
        onCancel={handleCancelCancel}
      >
        <Input.TextArea
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Reason for cancellation"
        />
      </Modal>

      <Modal
        title="Success"
        visible={isSuccessModalVisible}
        onOk={handleSuccessOk}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Mẫu đã được hủy thành công!</p>
      </Modal>
    </Form>
  );
}

export default InfoForm;

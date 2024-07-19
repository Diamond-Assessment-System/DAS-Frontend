import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Radio, Button, Form, Typography, Row, Col, Input } from "antd";
import axios from "axios";
import { getCancelAssessmentlUrl } from "../../utils/apiEndPoints";

const { Title } = Typography;

function SelectionForm() {
  const [loai, setLoai] = useState("");
  const [trangThai, setTrangThai] = useState("");
  const [xuatXu, setXuatXu] = useState("");
  const [measurement, setMeasurement] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLoaiChange = (e) => {
    const value = e.target.value;
    setLoai(value);
    if (value === "Đá Giả Kim Cương") {
      setTrangThai(""); // Reset trạng thái
      setXuatXu(""); // Reset xuất xứ
      setMeasurement(""); // Reset kích thước
    }
  };

  const handleSubmit = async (values) => {
    if (loai === "Đá Giả Kim Cương") {
      try {
        await axios.put(getCancelAssessmentlUrl(id));
        navigate("/assessmentstaff");
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Có lỗi xảy ra khi cập nhật trạng thái.");
      }
    } else if (loai && trangThai && xuatXu && measurement) {
      const selectedOptions = { loai, trangThai, xuatXu, measurement }; // Thêm kích thước vào dữ liệu gửi đi
      navigate(`/assessmentstaff/assessmentbooking/${id}/selection/info`, {
        state: selectedOptions,
      });
    } else {
      alert("Vui lòng chọn tất cả các thuộc tính.");
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto mt-12"
      initialValues={{ loai, trangThai, xuatXu, measurement }}
    >
      <div className="text-center mb-8">
        <Title level={2} className="m-0">
          Thuộc Tính
        </Title>
      </div>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Type</span>}
            className="mb-6"
            name="loai"
            rules={[{ required: true, message: "Vui lòng chọn loại!" }]}
          >
            <Radio.Group
              onChange={handleLoaiChange}
              value={loai}
              className="flex space-x-4"
            >
              <Radio value="Kim Cương" className="text-lg">
                Diamond
              </Radio>
              <Radio value="Đá Giả Kim Cương" className="text-lg">
                Diamond-Like
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Status</span>}
            className="mb-6"
            name="trangThai"
            rules={[
              {
                required: loai !== "Đá Giả Kim Cương",
                message: "Vui lòng chọn trạng thái!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => setTrangThai(e.target.value)}
              value={trangThai}
              disabled={loai === "Đá Giả Kim Cương"}
              className="flex space-x-4"
            >
              <Radio value="Đã Xử Lý" className="text-lg">
                Processed
              </Radio>
              <Radio value="Chưa Xử Lý" className="text-lg">
                Not Processed
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Origin</span>}
            className="mb-6"
            name="xuatXu"
            rules={[
              {
                required: loai !== "Đá Giả Kim Cương",
                message: "Vui lòng chọn xuất xứ!",
              },
            ]}
          >
            <Radio.Group
              onChange={(e) => setXuatXu(e.target.value)}
              value={xuatXu}
              disabled={loai === "Đá Giả Kim Cương"}
              className="flex space-x-4"
            >
              <Radio value="Tự Nhiên" className="text-lg">
                Natural
              </Radio>
              <Radio value="Nhân Tạo" className="text-lg">
                Non-Natural
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={<span className="font-bold text-lg">Measurement</span>}
            className="mb-6"
            name="measurement"
            rules={[
              {
                required: loai !== "Đá Giả Kim Cương",
                message: "Vui lòng nhập kích thước!",
              },
            ]}
          >
            <Input
              placeholder="Enter measurement (e.g., 3.35-3.7x4.1 mm)"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
              disabled={loai === "Đá Giả Kim Cương"}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className="flex justify-center w-full">
            <Button type="primary" htmlType="submit" className="w-40 text-lg">
              {loai === "Đá Giả Kim Cương" ? "Kết thúc" : "Tiếp theo"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default SelectionForm;

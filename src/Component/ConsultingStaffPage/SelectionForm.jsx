import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Radio, Button, Form, Typography } from 'antd';

const { Title } = Typography;

function SelectionForm() {
  const [loai, setLoai] = useState('');
  const [trangThai, setTrangThai] = useState('');
  const [xuatXu, setXuatXu] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLoaiChange = (e) => {
    const value = e.target.value;
    setLoai(value);
    if (value === 'Đá Giả Kim Cương') {
      setTrangThai(''); // Reset trạng thái
      setXuatXu(''); // Reset xuất xứ
    }
  };

  const handleSubmit = () => {
    if (loai && (loai === 'Đá Giả Kim Cương' || (trangThai && xuatXu))) {
      const selectedOptions = { loai, trangThai, xuatXu };
      navigate(`/assessmentstaff/assessmentbooking/${id}/selection/info`, { state: selectedOptions });
    } else {
      alert('Vui lòng chọn tất cả các thuộc tính.');
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <div className="text-center mb-4">
        <Title level={2} className="m-0">
          Thuộc Tính
        </Title>
      </div>
      <Form.Item label="Loại :" className="mb-4">
        <Radio.Group onChange={handleLoaiChange} value={loai}>
          <Radio value="Kim Cương">Kim Cương</Radio>
          <Radio value="Đá Giả Kim Cương">Đá Giả Kim Cương</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Trạng Thái :" className="mb-4">
        <Radio.Group
          onChange={(e) => setTrangThai(e.target.value)}
          value={trangThai}
          disabled={loai === 'Đá Giả Kim Cương'}
        >
          <Radio value="Đã Xử Lý">Đã Xử Lý</Radio>
          <Radio value="Chưa Xử Lý">Chưa Xử Lý</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Xuất Xứ :" className="mb-4">
        <Radio.Group
          onChange={(e) => setXuatXu(e.target.value)}
          value={xuatXu}
          disabled={loai === 'Đá Giả Kim Cương'}
        >
          <Radio value="Tự Nhiên">Tự Nhiên</Radio>
          <Radio value="Nhân Tạo">Nhân Tạo</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Tiếp theo
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SelectionForm;

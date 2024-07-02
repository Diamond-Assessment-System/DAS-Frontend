import { Button, DatePicker, Form, InputNumber } from "antd";
import Input from "antd/es/input/Input";
import "../RequestBooking/RequestBookingContent.css";

function RequestBookingContent() {
  const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  return (
    <>
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      ></Form>
      <div className="container-requestbooking">
        <h2> Mã Giao Dịch</h2>
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            label="Tên Khách Hàng"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số Điện Thoại"
            name="phonenumber"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Dịch Vụ"
            name="service"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số Lượng(Viên)"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          {/* <Form.Item
            label="Select"
            name="Select"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Cascader"
            name="Cascader"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Cascader />
          </Form.Item>

          <Form.Item
            label="TreeSelect"
            name="TreeSelect"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TreeSelect />
          </Form.Item> */}
          <Form.Item
            label="Địa Chỉ Giao Dịch"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ngày Hẹn"
            name="DatePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          {/* <Form.Item
            label="RangePicker"
            name="RangePicker"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <RangePicker />
          </Form.Item> */}

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tiếp Tục
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default RequestBookingContent;

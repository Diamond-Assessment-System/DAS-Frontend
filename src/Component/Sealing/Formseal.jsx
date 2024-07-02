import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import "../Sealing/FormSeal.css";
const SealForm = () => {
    const [sealData, setSealData] = useState({
        sealId: "",
        weight: "",
        shape: "",
        size: "",
        dateCreated: "",
        color: "",
        clarity: ""
    });

    const [form] = Form.useForm();

    const handleInputChange = (changedValues, allValues) => {
        setSealData(allValues);
    };

    const handleSubmit = () => {
        console.log(sealData);
    };

    return (
        <div className="seal-form-container">
            <Form
                form={form}
                onValuesChange={handleInputChange}
                layout="vertical"
                onFinish={handleSubmit}
                className="seal-form"
            >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a Seal</h2>
                <Form.Item
                    label="Seal ID"
                    name="sealId"
                    rules={[{ required: true, message: 'Please enter the Seal ID!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Weight"
                    name="weight"
                    rules={[{ required: true, message: 'Please enter the weight!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Shape"
                    name="shape"
                    rules={[{ required: true, message: 'Please enter the shape!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Size"
                    name="size"
                    rules={[{ required: true, message: 'Please enter the size!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date Created"
                    name="dateCreated"
                    rules={[{ required: true, message: 'Please select the date created!' }]}
                >
                    <Input type="date" />
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    rules={[{ required: true, message: 'Please enter the color!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Clarity"
                    name="clarity"
                    rules={[{ required: true, message: 'Please enter the clarity!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Create Seal
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SealForm;

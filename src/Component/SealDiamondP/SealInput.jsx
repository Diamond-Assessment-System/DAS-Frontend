import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "../AssessmentBookingDiamondInputPage/AssessmentBookingDiamondInput.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import ProgressBar from "../Progressbar/ProgressBar";
import { SERVICES_URL } from "../../utils/apiEndPoints";

const SealInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, serviceData, numberOfSamples, id } = location.state || {};
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [servicePrice, setServicePrice] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    const fetchServicePrice = async () => {
      try {
        const response = await axios.get(SERVICES_URL);
        const service = response.data.find(service => service.serviceId === serviceData.serviceId);
        if (service) {
          setServicePrice(service.servicePrice);
        } else {
          console.error("Service not found");
        }
      } catch (error) {
        console.error("Error fetching the service price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServicePrice();
  }, [serviceData.serviceId]);

  useEffect(() => {
    if (servicePrice !== null) {
      const updatedSamples = [];
      for (let i = 0; i < numberOfSamples; i++) {
        updatedSamples.push({
          name: `Mẫu ${i + 1}`,
          size: 1, // Set size to 1
          price: servicePrice,
          isDiamond: 1,
          status: 1,
        });
        form.setFieldsValue({ [`diamond${i + 1}Price`]: servicePrice });
      }
      setSamples(updatedSamples);
    }
  }, [servicePrice, numberOfSamples, form]);

  const renderDiamondFields = () => {
    const diamondFields = [];
    for (let i = 0; i < numberOfSamples; i++) {
      diamondFields.push(
        <div key={i} className="diamond-field">
          <Form.Item label={`Tên mẫu`}>
            <Input disabled value={`Mẫu ${i + 1}`} />
          </Form.Item>
          <Form.Item label="Số tiền" name={`diamond${i + 1}Price`}>
            <Input disabled />
          </Form.Item>
        </div>
      );
    }
    return <div className="diamond-fields-container">{diamondFields}</div>;
  };

  const handleNextClick = () => {
    form
      .validateFields()
      .then(() => {
        if (window.confirm("Thông tin đã xác thực?")) {
          navigate(`/consultingstaff/assessmentrequest/${id}/inputdiamonds/summary`, {
            state: {
              diamonds: samples,
              bookingData,
              serviceData,
            },
          });
        }
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <ProgressBar />

      <div className="assessment-booking-diamond-input">
        <Form
          form={form}
          onValuesChange={() => {}}
          layout="horizontal"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          {renderDiamondFields()}
          <Form.Item>
            <Button type="primary" onClick={handleNextClick}>
              Next
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SealInput;

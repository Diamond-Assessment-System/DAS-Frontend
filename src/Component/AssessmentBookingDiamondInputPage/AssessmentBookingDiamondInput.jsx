import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./AssessmentBookingDiamondInput.css";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import ProgressBar from "../Progressbar/ProgressBar";
import { SERVICE_PRICE_LIST_URL } from "../../utils/apiEndPoints";
import { handleSession } from "../../utils/sessionUtils";
import { checkRole } from "../../utils/checkRole";

const AssessmentBookingDiamondInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, serviceData, numberOfSamples, id } =
    location.state || {};
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const [diamondPrices, setDiamondPrices] = useState([]);
  const [service, setService] = useState(serviceData);
  const [samples, setSamples] = useState([]);

  useEffect(() => {


    const account = handleSession(navigate);
    if (!account) {
      navigate(`/login`);
    }
    if (checkRole(account.accountId) != 3 || checkRole(account.accountId) != 4 || checkRole(account.accountId) != 6){
      navigate(`/nopermission`);
    };

    
    const fetchDiamondPrices = async () => {
      try {
        const response = await axios.get(SERVICE_PRICE_LIST_URL);
        setDiamondPrices(response.data);
      } catch (error) {
        console.error("Error fetching the prices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiamondPrices();
  }, []);

  const calculatePrice = (size) => {
    const { servicePrice } = service;
    const priceData = diamondPrices.find(
      (price) => size >= price.sizeFrom && size <= price.sizeTo
    );

    if (priceData) {
      const { initPrice, sizeFrom, priceUnit } = priceData;
      const price = servicePrice + initPrice + (size - sizeFrom) * priceUnit;
      return Math.round(price);
    }

    return "N/A";
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
      form.setFieldsValue({ [`diamond${i + 1}Price`]: price });
    }
    setSamples(updatedSamples);
  };

  const validateSize = (_, value) => {
    if (value < 0) {
      return Promise.reject(new Error("Kích cỡ phải lớn hơn hoặc bằng 0!"));
    }
    if (value > 100) {
      return Promise.reject(new Error("Kích cỡ không được vượt quá 100!"));
    }
    if (isNaN(value)) {
      return Promise.reject(new Error("Kích cỡ phải là số!"));
    }
    return Promise.resolve();
  };

  const renderDiamondFields = () => {
    const diamondFields = [];
    for (let i = 0; i < numberOfSamples; i++) {
      diamondFields.push(
        <div key={i} className="diamond-field">
          <Form.Item label={`Tên mẫu`}>
            <Input disabled value={`Mẫu ${i + 1}`} />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            name={`diamond${i + 1}Size`}
            rules={[
              { required: true, message: "Nhập kích cỡ!" },
              { validator: validateSize },
            ]}
          >
            <Input
              type="number"
              placeholder="Nhập kích cỡ (mm)"
              onChange={(e) => {
                const size = parseFloat(e.target.value);
                const price = calculatePrice(size);
                form.setFieldsValue({ [`diamond${i + 1}Price`]: price });
              }}
              min="0"
              max="100"
            />
          </Form.Item>
          <Form.Item label="Số tiền ước tính" name={`diamond${i + 1}Price`}>
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="ID Giá Dịch Vụ"
            name={`diamond${i + 1}ServicePriceId`}
            hidden
          >
            <Input /> {/* Input field for servicePriceId */}
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
          navigate(
            "/consultingstaff/assessmentrequest/" +
              id +
              "/inputdiamonds/summary",
            {
              state: {
                diamonds: samples,
                bookingData,
                serviceData,
              },
            }
          );
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
          onValuesChange={handleFormChange}
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

export default AssessmentBookingDiamondInput;

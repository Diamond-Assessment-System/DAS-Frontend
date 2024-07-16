import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "../ManagerLayout/ManagePricingTimeline.css";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";

const ServiceModal = ({ show, handleClose, handleSubmit, formValues, handleInputChange, isEditMode }) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/\s/g, '');
    handleInputChange({ target: { name, value: formattedValue } });
  };

  return (
    <Modal show={show} onHide={handleClose} className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>{formValues.servicePriceId ? "Edit Service" : "Add Service"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSizeFrom">
            <Form.Label>Kích thước từ</Form.Label>
            <Form.Control
              type="text"
              name="sizeFrom"
              value={formValues.sizeFrom}
              onChange={handleInputChange}
              required
              disabled={isEditMode}
            />
          </Form.Group>
          <Form.Group controlId="formSizeTo">
            <Form.Label>Đến</Form.Label>
            <Form.Control
              type="text"
              name="sizeTo"
              value={formValues.sizeTo}
              onChange={handleInputChange}
              required
              disabled={isEditMode}
            />
          </Form.Group>
          <Form.Group controlId="formInitPrice">
            <Form.Label>Giá cơ bản</Form.Label>
            <Form.Control
              type="text"
              name="initPrice"
              value={formatPrice(formValues.initPrice)}
              onChange={handlePriceChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPriceUnit">
            <Form.Label>Giá tăng thêm</Form.Label>
            <Form.Control
              type="text"
              name="priceUnit"
              value={formatPrice(formValues.priceUnit)}
              onChange={handlePriceChange}
              required
            />
          </Form.Group>
          <div className="modal-footer">
            <Button className="custom-save-button" type="submit">
              Lưu
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ManageServicePrice = () => {
  const [loading, setLoading] = useState(true);
  const [prices, setPrices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    servicePriceId: "",
    sizeFrom: "",
    sizeTo: "",
    initPrice: "",
    priceUnit: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const fetchServicePrices = async () => {
    try {
      const response = await axios.get(`https://das-backend.fly.dev/api/service-price-lists`);
      setPrices(response.data);
    } catch (error) {
      console.error("Error fetching the service prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicePrices();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };


  const editService = (prices) => {
    setFormValues({
        servicePriceId: prices.servicePriceId,
      sizeFrom: prices.sizeFrom,
      sizeTo: prices.sizeTo,
      initPrice: prices.initPrice,
      priceUnit: prices.priceUnit,
    });
    setIsEditMode(true);
    setShowModal(true);
  };

  const addService = () => {
    setFormValues({
        servicePriceId: "",
        sizeFrom: "",
        sizeTo: "",
        initPrice: "",
        priceUnit: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmMessage = formValues.servicePriceId ? "Bạn có chắc chắn muốn lưu các thay đổi này?" : "Bạn có chắc chắn muốn thêm dịch vụ này?";
    if (window.confirm(confirmMessage)) {
      try {
        if (formValues.servicePriceId) {
          await axios.put(`https://das-backend.fly.dev/api/service-price-lists/${formValues.servicePriceId}`, formValues);
        } else {
          await axios.post(`https://das-backend.fly.dev/api/service-price-lists`, formValues);
        }
        setShowModal(false);
        fetchServicePrices(); // Reload the data
        setFormValues({
            servicePriceId: "",
            sizeFrom: "",
            sizeTo: "",
            initPrice: "",
            priceUnit: "",
        });
      } catch (error) {
        console.error("Error saving the service price:", error);
      }
    }
  };

  const handleCloseModal = () => {
    if (window.confirm("Bạn muốn dừng chỉnh sửa thông tin dịch vụ?")) {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-full mx-auto p-4">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Quản Lý Giá Dịch Vụ
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">ID</th>
                <th className="py-4 px-4 text-center align-middle">Vùng kích thước</th>
                <th className="py-4 px-4 text-center align-middle">Giá cơ bản</th>
                <th className="py-4 px-4 text-center align-middle">Giá thêm</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {prices.map((prices) => (
                <tr key={prices.servicePriceId}>
                  <td className="py-4 px-4 text-center align-middle">
                    {prices.servicePriceId}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {prices.sizeFrom} mm → {prices.sizeTo} mm
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {formatPrice(prices.initPrice)} VND
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {formatPrice(prices.priceUnit)} VND
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <Button
                      variant="primary"
                      onClick={() => editService(prices)}
                      style={{width: "100px", background: "green", fontWeight: "Bold"}}
                    >
                      Chỉnh Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ServiceModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
        formValues={formValues}
        handleInputChange={handleInputChange}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ManageServicePrice;

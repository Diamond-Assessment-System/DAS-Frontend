import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../ManagerLayout/ManagePricingTimeline.css";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";

const ServiceModal = ({ show, handleClose, handleSubmit, formValues, handleInputChange, handleDescriptionChange }) => {
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
        <Modal.Title>{formValues.serviceId ? "Edit Service" : "Add Service"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formServiceName">
            <Form.Label>Tên Dịch Vụ</Form.Label>
            <Form.Control
              type="text"
              name="serviceName"
              value={formValues.serviceName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formServiceDescription">
            <Form.Label>Mô Tả Dịch Vụ</Form.Label>
            <ReactQuill
              value={formValues.serviceDescription}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
          <Form.Group controlId="formServiceStatus">
            <Form.Label>Trạng Thái</Form.Label>
            <Form.Control
              type="text"
              name="serviceStatus"
              value={formValues.serviceStatus}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formServiceType">
            <Form.Label>Loại Dịch Vụ</Form.Label>
            <Form.Control
              as="select"
              name="serviceType"
              value={formValues.serviceType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Type</option>
              <option value="1">Giám định</option>
              <option value="2">Niêm phong</option>
              <option value="3">Khác</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formServicePrice">
            <Form.Label>Giá Dịch Vụ</Form.Label>
            <Form.Control
              type="text"
              name="servicePrice"
              value={formatPrice(formValues.servicePrice)}
              onChange={handlePriceChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formServiceTime">
            <Form.Label>Thời Gian (giờ)</Form.Label>
            <Form.Control
              type="number"
              name="serviceTime"
              value={formValues.serviceTime}
              onChange={handleInputChange}
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

const ManageOrderTimelines = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState({
    serviceId: "",
    serviceName: "",
    serviceDescription: "",
    serviceStatus: "",
    serviceType: "",
    servicePrice: "",
    serviceTime: "",
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get(SERVICES_URL);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching the services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const getServiceTypeText = (type) => {
    switch (type) {
      case 1:
        return "Giám định";
      case 2:
        return "Niêm phong";
      case 3:
        return "Khác";
      default:
        return "NULL";
    }
  };

  const editService = (service) => {
    setFormValues({
      serviceId: service.serviceId,
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      serviceStatus: service.serviceStatus,
      serviceType: service.serviceType,
      servicePrice: service.servicePrice,
      serviceTime: service.serviceTime,
    });
    setShowModal(true);
  };

  const addService = () => {
    setFormValues({
      serviceId: "",
      serviceName: "",
      serviceDescription: "",
      serviceStatus: "",
      serviceType: "",
      servicePrice: "",
      serviceTime: "",
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      serviceDescription: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const confirmMessage = formValues.serviceId ? "Bạn có chắc chắn muốn lưu các thay đổi này?" : "Bạn có chắc chắn muốn thêm dịch vụ này?";
    if (window.confirm(confirmMessage)) {
      try {
        if (formValues.serviceId) {
          await axios.put(`${SERVICES_URL}/${formValues.serviceId}`, formValues);
        } else {
          await axios.post(SERVICES_URL, formValues);
        }
        setShowModal(false);
        fetchServices(); // Reload the data
        setFormValues({
          serviceId: "",
          serviceName: "",
          serviceDescription: "",
          serviceStatus: "",
          serviceType: "",
          servicePrice: "",
          serviceTime: "",
        });
      } catch (error) {
        console.error("Error saving the service:", error);
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
          Quản Lý Dịch Vụ
        </h4>
        <Button
          className="mb-4"
          variant="success"
          onClick={addService}
        >
          Thêm Dịch Vụ Mới
        </Button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">ID</th>
                <th className="py-4 px-4 text-center align-middle">Tên</th>
                <th className="py-4 px-4 text-center align-middle">Mô Tả</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Loại</th>
                <th className="py-4 px-4 text-center align-middle">Giá Dịch Vụ</th>
                <th className="py-4 px-4 text-center align-middle">Thời Gian</th>
                <th className="py-4 px-4 text-center align-middle">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {services.map((service) => (
                <tr key={service.serviceId}>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.serviceId}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.serviceName}
                  </td>
                  <td className="py-4 px-4 text-center align-middle" dangerouslySetInnerHTML={{ __html: service.serviceDescription }}>
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.serviceStatus}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {getServiceTypeText(service.serviceType)}
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {formatPrice(service.servicePrice)} VND
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.serviceTime}h
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <Button
                      variant="primary"
                      onClick={() => editService(service)}
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
        handleDescriptionChange={handleDescriptionChange}
      />
    </div>
  );
};

export default ManageOrderTimelines;

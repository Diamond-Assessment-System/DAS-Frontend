import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../ManagerLayout/ManagePricingTimeline.css";
import { SERVICES_URL } from "../../utils/apiEndPoints";
import Spinner from "../Spinner/Spinner";

const ManageOrderTimelines = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const formRef = useRef(null); // Create a ref for the form
  const [formValues, setFormValues] = useState({
    serviceId: "",
    serviceName: "",
    serviceDescription: "",
    serviceStatus: "",
    serviceType: "",
    servicePrice: "",
    serviceTime: "",
  });

  useEffect(() => {
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

    fetchServices();
  }, []);

  useEffect(() => {
    if (editingService) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [editingService]);

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
    setEditingService(service);
    setFormValues({
      serviceId: service.serviceId,
      serviceName: service.serviceName,
      serviceDescription: service.serviceDescription,
      serviceStatus: service.serviceStatus,
      serviceType: service.serviceType,
      servicePrice: service.servicePrice,
      serviceTime: service.serviceTime,
    });
  };

  const addService = () => {
    setEditingService({});
    setFormValues({
      serviceId: "",
      serviceName: "",
      serviceDescription: "",
      serviceStatus: "",
      serviceType: "",
      servicePrice: "",
      serviceTime: "",
    });
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
    const confirmMessage = formValues.serviceId ? "Bạn có chắc chắn muốn lưu các thay đổi này?" : "Bạn có chắc chắn muốn thêm dịch vụ này?";
    if (window.confirm(confirmMessage)) {
      try {
        if (formValues.serviceId) {
          // Update existing service
          await axios.put(`${SERVICES_URL}/${formValues.serviceId}`, formValues);
          setServices((prevServices) =>
            prevServices.map((service) =>
              service.serviceId === formValues.serviceId ? formValues : service
            )
          );
        } else {
          // Add new service
          const response = await axios.post(SERVICES_URL, formValues);
          setServices((prevServices) => [...prevServices, response.data]);
        }
        // Reset form and editing state
        setEditingService(null);
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

  const handleCancelEdit = () => {
    if (window.confirm("Bạn muốn dừng chỉnh sửa thông tin dịch vụ?")) {
      setEditingService(null);
      setFormValues({
        serviceId: "",
        serviceName: "",
        serviceDescription: "",
        serviceStatus: "",
        serviceType: "",
        servicePrice: "",
        serviceTime: "",
      });
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
          Manage Assessment Services
        </h4>
        <button
          className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={addService}
        >
          Add Service
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">ID</th>
                <th className="py-4 px-4 text-center align-middle">Name</th>
                <th className="py-4 px-4 text-center align-middle">Description</th>
                <th className="py-4 px-4 text-center align-middle">Status</th>
                <th className="py-4 px-4 text-center align-middle">Type</th>
                <th className="py-4 px-4 text-center align-middle">Price</th>
                <th className="py-4 px-4 text-center align-middle">Time</th>
                <th className="py-4 px-4 text-center align-middle">Action</th>
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
                    {service.servicePrice}VND
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    {service.serviceTime}h
                  </td>
                  <td className="py-4 px-4 text-center align-middle">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => editService(service)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {editingService && (
          <div ref={formRef} className="mt-4"> {/* Add ref to the form container */}
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              {formValues.serviceId ? "Edit Service" : "Add Service"}
            </h4>
            <form
              onSubmit={handleFormSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="serviceName"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={formValues.serviceName}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="serviceDescription"
                >
                  Description
                </label>
                <textarea
                  name="serviceDescription"
                  value={formValues.serviceDescription}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="serviceStatus"
                >
                  Status
                </label>
                <input
                  type="text"
                  name="serviceStatus"
                  value={formValues.serviceStatus}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="serviceType"
                >
                  Type
                </label>
                <select
                  name="serviceType"
                  value={formValues.serviceType}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="1">Giám định</option>
                  <option value="2">Niêm phong</option>
                  <option value="3">Khác</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="servicePrice"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="servicePrice"
                  value={formValues.servicePrice}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="serviceTime"
                >
                  Time
                </label>
                <input
                  type="number"
                  name="serviceTime"
                  value={formValues.serviceTime}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrderTimelines;

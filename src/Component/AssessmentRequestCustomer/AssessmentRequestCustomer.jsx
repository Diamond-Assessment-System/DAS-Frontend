import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AssessmentRequestCustomer.css";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import {
  ASSESSMENT_BOOKINGS_URL,
  SERVICES_URL,
} from "../../utils/apiEndPoints";

function AssessmentRequest() {
  const [loggedAccount, setLoggedAccount] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(SERVICES_URL);
        console.log("Fetched services: ", response.data); // Log the fetched services
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching the services:", error);
      }
    };

    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
    }

    fetchServices();
    setLoading(false);
  }, [navigate]);

  const formatDateToLocalDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
  };

  const formik = useFormik({
    initialValues: {
      phone: "",
      serviceId: "",
      paymentType: "",
      quantities: 1,
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 chữ số.")
        .required("Vui lòng nhập số điện thoại!"),
      serviceId: Yup.string().required("Vui lòng chọn dịch vụ!"),
      paymentType: Yup.string().required("Vui lòng chọn hình thức thanh toán!"),
      quantities: Yup.number()
        .required("Vui lòng nhập số lượng!")
        .min(1, "Ít nhất 1 mẫu.")
        .max(100, "Không quá 100 mẫu."),
    }),
    onSubmit: (values) => {
      if (window.confirm("Bạn có chắc chắn muốn đặt lịch không?")) {
        setIsProcessing(true);
        const now = new Date();
        const selectedService = services.find(
          (service) => service.serviceId === parseInt(values.serviceId)
        );

        const data = {
          ...values,
          serviceId: parseInt(values.serviceId),
          accountId: loggedAccount.accountId,
          status: 1,
          paymentStatus: 1,
          dateCreated: formatDateToLocalDateTime(now),
          serviceName: selectedService
            ? selectedService.serviceName
            : "Unknown Service",
        };

        axios
          .post(ASSESSMENT_BOOKINGS_URL, data)
          .then((response) => {
            console.log("Success:", response.data);
            navigate("/success", { state: { ...response.data, ...data } });
          })
          .catch((error) => {
            console.error("Error:", error);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
  });

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20 max-w-xl">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-gray-100 shadow-md rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
          Đặt Hẹn
        </h2>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Số Điện Thoại
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.phone && formik.errors.phone
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.phone}
            </div>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="serviceId"
          >
            Chọn Dịch Vụ
          </label>
          <select
            id="serviceId"
            name="serviceId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serviceId}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.serviceId && formik.errors.serviceId
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="" label="Chọn Dịch Vụ" />
            {services.map((service) => (
              <option key={service.serviceId} value={service.serviceId}>
                {service.serviceName}
              </option>
            ))}
          </select>
          {formik.touched.serviceId && formik.errors.serviceId ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.serviceId}
            </div>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="paymentType"
          >
            Hình Thức Thanh Toán
          </label>
          <select
            id="paymentType"
            name="paymentType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.paymentType}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.paymentType && formik.errors.paymentType
                ? "border-red-500"
                : ""
            }`}
          >
            <option value="" label="Chọn Hình Thức Thanh Toán" />
            <option value={1} label="Tiền Mặt" />
            <option value={2} label="Chuyển Khoản" />
          </select>
          {formik.touched.paymentType && formik.errors.paymentType ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.paymentType}
            </div>
          ) : null}
        </div>

        <div className="mb-4 text-left">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantities"
          >
            Số Lượng (Viên)
          </label>
          <input
            id="quantities"
            name="quantities"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantities}
            min="1"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.quantities && formik.errors.quantities
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.quantities && formik.errors.quantities ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.quantities}
            </div>
          ) : null}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isProcessing}
          >
            Đặt Lịch
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssessmentRequest;

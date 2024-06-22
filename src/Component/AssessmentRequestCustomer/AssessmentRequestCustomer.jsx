import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AssessmentRequestCustomer.css";

function AssessmentRequest() {
  const navigate = useNavigate();

  const formatDateToLocalDateTime = (date) => {
    return date.toISOString().split(".")[0]; // "yyyy-MM-ddTHH:mm:ss"
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      serviceId: "",
      numberOfSamples: 1,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please input!"),
      phone: Yup.string().required("Please input!"),
      address: Yup.string().required("Please input!"),
      serviceId: Yup.string().required("Please choose one!"),
      numberOfSamples: Yup.number()
        .required("Please input!")
        .min(1, "At least 1 sample"),
    }),
    onSubmit: (values) => {
      const now = new Date();
      const meetingDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

      const data = {
        requestId: -1,
        ...values,
        serviceId: parseInt(values.serviceId),
        accountId: 1,
        status: 1,
        dateCreated: formatDateToLocalDateTime(now),
        meetingDate: formatDateToLocalDateTime(meetingDate),
      };

      axios
        .post("http://localhost:8080/api/assessmentrequests", data)
        .then((response) => {
          console.log("Success:", response.data);
          navigate("/success", { state: response.data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  });

  return (
    <div className="container mx-auto p-4 mt-5 max-w-xl">
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
            htmlFor="name"
          >
            Tên Khách Hàng
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.name && formik.errors.name ? "border-red-500" : ""
            }`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.name}
            </div>
          ) : null}
        </div>

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
            htmlFor="address"
          >
            Địa Chỉ
          </label>
          <input
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.address && formik.errors.address
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.address}
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
            <option value="1" label="Giám Định Kim Cương 24H" />
            <option value="2" label="Giám Định Kim Cương 48H" />
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
            htmlFor="numberOfSamples"
          >
            Số Lượng(Viên)
          </label>
          <input
            id="numberOfSamples"
            name="numberOfSamples"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.numberOfSamples}
            min="1"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.numberOfSamples && formik.errors.numberOfSamples
                ? "border-red-500"
                : ""
            }`}
          />
          {formik.touched.numberOfSamples && formik.errors.numberOfSamples ? (
            <div className="text-red-500 text-xs italic mt-2">
              {formik.errors.numberOfSamples}
            </div>
          ) : null}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Đặt Lịch
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssessmentRequest;

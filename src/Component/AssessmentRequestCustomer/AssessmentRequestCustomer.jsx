import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AssessmentRequestCustomer.css";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";

function AssessmentRequest() {
  const [loggedAccount, setLoggedAccount] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
    }
    setLoading(false);
  }, [navigate]);

  const formatDateToLocalDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  

  const formik = useFormik({
    initialValues: {
      phone: "",
      serviceId: "",
      paymentType: "",
      quantities: 1,
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Please input!"),
      serviceId: Yup.string().required("Please choose one!"),
      paymentType: Yup.string().required("Please choose one!"),
      quantities: Yup.number()
        .required("Please input!")
        .min(1, "At least 1 sample"),
    }),
    onSubmit: (values) => {
      if (window.confirm("Bạn có chắc chắn muốn đặt lịch không?")) {
      const now = new Date();

      const data = {
        ...values,
        serviceId: parseInt(values.serviceId),
        accountId: loggedAccount.accountId,
        status: 1,
        paymentStatus: 1,
        dateCreated: formatDateToLocalDateTime(now),
      };
    

      axios
        .post("https://das-backend.fly.dev/api/assessment-bookings", data)
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
          >
            Đặt Lịch
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssessmentRequest;

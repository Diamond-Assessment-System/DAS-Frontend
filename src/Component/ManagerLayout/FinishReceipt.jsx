// src/components/FinishReceipt.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Spinner from "../Spinner/Spinner"; // Update the import path as needed
import { getBookingSamplesByBookingId } from "../../utils/getSamplesFromBookingId";
import { getBookingDetails } from "../../utils/getBookingDetails";
import getAccountFromId from "../../utils/getAccountFromId";
import { getPaymentTypeMeaning } from "../../utils/getStatusMeaning";
import { ASSESSMENT_PAPER_URL, ASSESSMENT_BOOKING_URL } from "../../utils/apiEndPoints";
import logo from "../../../public/logodas.png";
import { changeBookingStatus } from "../../utils/changeBookingStatus"; // Import the function to change booking status

function FinishReceipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [bookingDetails, setBookingDetails] = useState({});
  const [samples, setSamples] = useState([]);
  const [sampleDetails, setSampleDetails] = useState({});
  const [account, setAccount] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Fetch booking details
        const details = await getBookingDetails(bookingId);
        setBookingDetails(details);

        // Fetch account details
        const accountData = await getAccountFromId(details.accountId);
        setAccount(accountData);

        // Fetch samples
        const samplesData = await getBookingSamplesByBookingId(bookingId);
        setSamples(samplesData);

        // Fetch all assessment papers
        const assessmentPapersResponse = await axios.get(ASSESSMENT_PAPER_URL);
        const assessmentPapers = assessmentPapersResponse.data;

        // Find and set details for each sample
        const samplesWithDetails = samplesData.map(sample => {
          const sampleDetail = assessmentPapers.find(paper => paper.sampleId === sample.sampleId);
          return { ...sample, ...sampleDetail };
        });

        const detailsMap = samplesWithDetails.reduce((acc, sample) => {
          acc[sample.sampleId] = sample;
          return acc;
        }, {});

        setSampleDetails(detailsMap);

        // Fetch phone number
        const response = await axios.get(`${ASSESSMENT_BOOKING_URL}/${bookingId}`);
        const phone = response.data.phone;
        setPhoneNumber(phone);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [bookingId]);

  const formatDateToLocalDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async () => {
    try {
      await changeBookingStatus(bookingId, 4); // Change the booking status to 4
      navigate("/managerhistory"); // Redirect to ManagerHistory page
    } catch (error) {
      console.error("Error changing booking status:", error);
    }
  };

  const handlePayment = () => {
    navigate("/payment", { state: { bookingId } }); // Redirect to Payment page
  };

  if (loading) {
    return <Spinner />;
  }

  const receiveDate = formatDateToLocalDateTime(new Date());

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-4xl font-bold">Hóa Đơn Hoàn Thành</h2>
            <p className="text-2xl font-bold text-gray-600 py-2 mt-4">
              Đơn hàng #{bookingDetails.bookingId}
            </p>
          </div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </div>
        <hr className="mb-6" />
        <div className="flex justify-between mb-6">
          <div>
            <strong>Khách Hàng: {account.displayName}</strong> <br />
            <strong>{phoneNumber ? `Số điện thoại: ${phoneNumber}` : ""}</strong> <br />
            <strong>Email: {account.email}</strong>
          </div>
          <div>
            <strong>Ngày Tạo Đơn:</strong>
            <p>{bookingDetails.dateCreated}</p>
            <strong>Ngày Nhận Mẫu:</strong>
            <p>{receiveDate}</p>
            <strong>Ngày Hoàn Thành:</strong>
            <p>{bookingDetails.completionDate}</p>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Dịch vụ:</h3>
          <h3 className="text-xl font-semibold">Tóm Tắt Đơn Hàng</h3>
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center">STT</th>
                <th className="py-4 px-4 text-center">Tên mẫu</th>
                <th className="py-4 px-4 text-center">Kích cỡ</th>
                <th className="py-4 px-4 text-right">Giá(VND)</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {samples.map((sample, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-4 text-center">{index + 1}</td>
                  <td className="py-4 px-4 text-center">
                    {sample.name}
                    <div className="text-sm text-gray-600 mt-1">
                      {sample.cancelReason ? (
                        `Mẫu Huỷ: ${sample.cancelReason}`
                      ) : (
                        <>
                          Type: {sampleDetails[sample.sampleId]?.type || ''}, Shape: {sampleDetails[sample.sampleId]?.shape || ''}, Color: {sampleDetails[sample.sampleId]?.color || ''}, 
                          Clarity: {sampleDetails[sample.sampleId]?.clarity || ''}, Polish: {sampleDetails[sample.sampleId]?.polish || ''}, Symmetry: {sampleDetails[sample.sampleId]?.symmetry || ''}, 
                          Fluorescence: {sampleDetails[sample.sampleId]?.fluorescence || ''}, Weight: {sampleDetails[sample.sampleId]?.weight || ''}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">{sample.size}</td>
                  <td className="py-4 px-4 text-right">{sample.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="py-4 px-4 text-right font-bold">Tổng tiền</td>
                <td className="py-4 px-4 text-right font-bold">
                  {samples.reduce((acc, sample) => acc + sample.price, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <button
            onClick={handlePayment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Thanh Toán Chuyển Khoản
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinishReceipt;

import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { parse, addHours, format } from "date-fns";
import axios from "axios";
import { getPaymentTypeMeaning } from "../../utils/getStatusMeaning";
import { handleSession } from "../../utils/sessionUtils";
import Spinner from "../Spinner/Spinner";
import { geAssessmentSummaryDetailUrl } from "../../utils/apiEndPoints";
import getAccountFromId from "../../utils/getAccountFromId"; // Ensure this utility is imported
import "./AssetsmentList.css"; // Import the CSS file

function AssetsmentList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { diamonds, bookingData, serviceData } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [account, setAccount] = useState({});
  const [completionDate, setCompletionDate] = useState("");
  const [loggedAccount, setLoggedAccount] = useState({});

  useEffect(() => {
    const account = handleSession(navigate);
    if (account) {
      setLoggedAccount(account);
    }

    if (diamonds && diamonds.length > 0) {
      const total = diamonds.reduce((acc, diamond) => acc + diamond.price, 0);
      setTotalPrice(total);
    }

    const fetchAccount = async () => {
      try {
        const accountData = await getAccountFromId(bookingData.accountId);
        setAccount(accountData);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };

    if (bookingData && bookingData.accountId) {
      fetchAccount();
    }

    const createdDate = parse(
      bookingData.dateCreated,
      "yyyy/MM/dd - HH:mm:ss",
      new Date()
    );

    const receiveDate = new Date();
    const completedDate = addHours(receiveDate, serviceData.serviceTime);
    setCompletionDate(format(completedDate, "yyyy/MM/dd - HH:mm:ss"));
  }, [diamonds, bookingData, serviceData, navigate]);

  const formatDateToLocalDateTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`;
  };

  const receiveDate = formatDateToLocalDateTime(new Date());

  const handleSubmit = async () => {
    if (window.confirm("Bạn có chắc chắn muốn submit không?")) {
      const data = {
        status: 2,
        consultingAccountId: loggedAccount.accountId,
        sampleReturnDate: completionDate,
        paymentStatus: 2,
        totalPrice: totalPrice,
        dateReceived: format(new Date(), "yyyy/MM/dd - HH:mm:ss"),
      };

      try {
        const response = await axios.put(
          geAssessmentSummaryDetailUrl(bookingData.bookingId),
          data
        );
        console.log("Response:", response.data);
        await createBookingSamples();
        navigate("/consultingstaff");
      } catch (error) {
        console.error("Error submitting assessment booking:", error);
      }
    }
  };

  const createBookingSamples = async () => {
    try {
      const samplesData = diamonds.map((diamond) => ({
        status: 1,
        isDiamond: 1,
        name: diamond.name,
        size: diamond.size,
        price: diamond.price,
        bookingId: bookingData.bookingId,
      }));

      const response = await axios.post(
        "https://das-backend.fly.dev/api/booking-samples/samples",
        samplesData
      );
      console.log("Booking Samples created:", response.data);
    } catch (error) {
      console.error("Error creating booking samples:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="logo-container">
            <img src="/src/assets/logodas.png" alt="Logo" className="logo" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Hóa Đơn</h2>
            <p className="text-sm text-gray-600">
              Đơn hàng #{bookingData.bookingId}
            </p>
          </div>
        </div>
        <hr className="mb-6" />
        <div className="flex justify-between mb-6">
          <div>
            <strong>Khách Hàng: {account.displayName}</strong>
            <p>{account.phone ? `Số điện thoại: ${account.phone}` : ""}</p>
          </div>
          <div>
            <strong>Ngày Tạo Đơn:</strong>
            <p>{bookingData.dateCreated}</p>
            <strong>Ngày Nhận Mẫu:</strong>
            <p>{receiveDate}</p>
            <strong>Ngày Hoàn Thành:</strong>
            <p>{completionDate}</p>
          </div>
        </div>
        <div className="mb-6">
          <strong>Phương Thức Thanh Toán:</strong>
          <p>{getPaymentTypeMeaning(bookingData.paymentType)}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Dịch vụ:</h3>
          <h3 className="text-xl font-semibold">Tóm Tắt Đơn Hàng</h3>
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden mt-4">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-left">#</th>
                <th className="py-4 px-4 text-center">Tên mẫu</th>
                <th className="py-4 px-4 text-center">Kích cỡ</th>
                <th className="py-4 px-4 text-right">Giá</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {diamonds.map((diamond, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 text-center">{diamond.name}</td>
                  <td className="py-4 px-4 text-center">{diamond.size}</td>
                  <td className="py-4 px-4 text-right">${diamond.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" />
                <td className="py-4 px-4 text-right font-bold">Tổng tiền</td>
                <td className="py-4 px-4 text-right font-bold">
                  ${totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <Button type="primary" onClick={handleSubmit} className="mt-4 w-32">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AssetsmentList;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { parse, addHours, format } from "date-fns";
import axios from "axios";
import getAccountFromId from "../../utils/getAccountFromId";
import { getPaymentTypeMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import { getBookingResponseUrl, getServiceResponseUrl, getDiamondResponseUrl } from "../../utils/apiEndPoints";

function ReceiptDetail() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [diamonds, setDiamonds] = useState([]);
  const [bookingData, setBookingData] = useState({});
  const [serviceData, setServiceData] = useState({});
  const [account, setAccount] = useState({});
  const [completionDate, setCompletionDate] = useState("");

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const bookingResponse = await axios.get(getBookingResponseUrl(bookingId));
        setBookingData(bookingResponse.data);
        const serviceResponse = await axios.get(getServiceResponseUrl(bookingResponse.data.serviceId));
        setServiceData(serviceResponse.data);
        const diamondsResponse = await axios.get(getDiamondResponseUrl(bookingId));
        setDiamonds(diamondsResponse.data);

        const accountData = await getAccountFromId(bookingResponse.data.accountId);
        setAccount(accountData);

        const receivedDate = new Date(bookingResponse.data.dateReceived);
        const completedDate = new Date(addHours(bookingResponse.data.dateReceived, serviceResponse.data.serviceTime));
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <div className="loading-indicator">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <img src="/src/assets/logodas.png" alt="Logo" className="w-32" />
          <div>
            <h2 className="text-2xl font-bold">Hóa Đơn</h2>
            <p className="text-sm text-gray-600">Đơn hàng #{bookingId}</p>
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
            <p>{bookingData.dateReceived}</p>
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
                <th className="py-4 px-4 text-center">STT</th>
                <th className="py-4 px-4 text-center">Tên mẫu</th>
                <th className="py-4 px-4 text-center">Kích cỡ</th>
                <th className="py-4 px-4 text-center">Giá</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {diamonds.map((diamond, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 text-center">{diamond.name}</td>
                  <td className="py-4 px-4 text-center">{diamond.size}</td>
                  <td className="py-4 px-4 text-center">${diamond.price}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" />
                <td className="py-4 px-4 text-right font-bold">Tổng tiền</td>
                <td className="py-4 px-4 text-right font-bold">${bookingData.totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ReceiptDetail;

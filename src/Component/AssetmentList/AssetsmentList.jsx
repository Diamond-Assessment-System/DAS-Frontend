import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./AssetsmentList.css";
import getAccountFromId from "../../utils/getAccountFromId";
import { parse, addHours, format } from "date-fns";
import axios from "axios";
import { getPaymentTypeMeaning } from "../../utils/getStatusMeaning";
import { handleSession } from "../../utils/sessionUtils";

function AssetsmentList() {
  const location = useLocation();
  const navigate = useNavigate();
  const { diamonds, bookingData, serviceData } = location.state || {};

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

    // Fetch account data using bookingData.accountId
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
      "yyyy-MM-dd",
      new Date()
    );
    const completedDate = addHours(createdDate, serviceData.serviceTime);
    setCompletionDate(format(completedDate, "yyyy-MM-dd"));
  }, [diamonds, bookingData, serviceData, navigate]);

  const handleSubmit = async () => {
    // Prepare data object to send
    const data = {
      status: 2,
      consultingAccountId: loggedAccount.accountId,
      sampleReturnDate: completionDate,
      paymentStatus: 2,
      totalPrice: totalPrice,
      dateReceived: format(new Date(), "yyyy-MM-dd"),
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/assessment-bookings/proceed/${bookingData.bookingId}`,
        data
      );
      console.log("Response:", response.data);
      await createBookingSamples();
      navigate("/consultingstaff");
    } catch (error) {
      console.error("Error submitting assessment booking:", error);
    }
  };
  const createBookingSamples = async () => {
    try {
      const samplesData = diamonds.map((diamond) => ({
        status: 1, // Assuming status 1 means active or something similar
        isDiamond: 1, // Assuming it's a diamond sample
        name: diamond.name,
        size: diamond.size,
        price: diamond.price,
        bookingId: bookingData.bookingId,
      }));

      const response = await axios.post(
        "http://localhost:8080/api/booking-samples/samples",
        samplesData
      );
      console.log("Booking Samples created:", response.data);
    } catch (error) {
      console.error("Error creating booking samples:", error);
    }
  };
  return (
    <div className="container-assetsmentlist">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="grid invoice">
              <div className="grid-body">
                <div className="invoice-title">
                  <div className="row">
                    <div className="col-xs-12">
                      <img src="../src/image/logo.png" alt="" />
                    </div>
                  </div>
                  <br />
                  <div className="row">
                    <div className="col-xs-12">
                      <h2>
                        Hóa Đơn
                        <br />
                        <span className="small">
                          Đơn hàng #{bookingData.bookingId}
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-6">
                    <address>
                      <strong>Khách Hàng: {account.displayName}</strong>
                      {account.phone ? `Số điện thoại: ${account.phone}` : ""}
                      <br />
                    </address>
                  </div>
                  <div className="col-xs-6">
                    <address>
                      <strong>Ngày Tạo Đơn:</strong>
                      <br />
                      {bookingData.dateCreated}
                      <br />
                      <strong>Ngày Hoàn Thành:</strong>
                      <br />
                      {completionDate}
                      <br />
                    </address>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-6">
                    <address>
                      <strong>Phương Thức Thanh Toán:</strong>
                      <br />
                      {getPaymentTypeMeaning(bookingData.paymentType)}
                      <br />
                    </address>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <h3>Dịch vụ:</h3>
                    <h3>Tóm Tắt Đơn Hàng</h3>
                    <br />
                    <table className="table table-striped table-hover ">
                      <thead>
                        <tr className="">
                          <th>
                            <strong>#</strong>
                          </th>
                          <th className="text-center">
                            <strong>Tên mẫu</strong>
                          </th>
                          <th className="text-center">
                            <strong>Kích cỡ</strong>
                          </th>
                          <th className="text-right">
                            <strong>Giá</strong>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {diamonds.map((diamond, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <strong>{diamond.name}</strong>
                            </td>
                            <td className="text-center">{diamond.size}</td>
                            <td className="text-right">${diamond.price}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="2" />
                          <td className="text-right">
                            <strong>Tổng tiền</strong>
                          </td>
                          <td className="text-right">
                            <strong>${totalPrice}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetsmentList;

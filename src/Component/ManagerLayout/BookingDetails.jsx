import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import Pagination from "../Paginate/Pagination";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import { getBookingSamplesByBookingId } from "../../utils/getSamplesFromBookingId";
import { changeBookingStatus } from "../../utils/changeBookingStatus";
import { ASSESSMENT_PAPER_URL } from "../../utils/apiEndPoints";

function BookingDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingId } = location.state;
  const [samples, setSamples] = useState([]);
  const [sampleDetails, setSampleDetails] = useState({});
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  // Email modal state
  const [showModal, setShowModal] = useState(false);
  const [emailContent, setEmailContent] = useState({
    toEmail: "",
    subject: "Hoàn Thành Đơn Hàng",
    name: "",
    messageBody: "",
    senderName: "DAS's Manager",
  });

  useEffect(() => {
    const fetchBookingSamples = async () => {
      try {
        const samplesData = await getBookingSamplesByBookingId(bookingId);
        setSamples(samplesData);

        const assessmentPapersResponse = await axios.get(ASSESSMENT_PAPER_URL);
        const assessmentPapers = assessmentPapersResponse.data;

        const samplesWithDetails = samplesData.map(sample => {
          const sampleDetail = assessmentPapers.find(paper => paper.sampleId === sample.sampleId);
          return { ...sample, ...sampleDetail };
        });

        const detailsMap = samplesWithDetails.reduce((acc, sample) => {
          acc[sample.sampleId] = sample;
          return acc;
        }, {});
        setSampleDetails(detailsMap);

      } catch (error) {
        console.error("Error fetching booking samples:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingSamples();
  }, [bookingId]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(samples.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(samples.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, samples]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    const newOffset = selectedPage * itemsPerPage;
    setItemOffset(newOffset);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 3:
        return "status-completed";
      case 4:
        return "status-canceled";
      case 2:
        return "status-assessing";
      case 1:
        return "status-opened";
      default:
        return "";
    }
  };

  const completeOrder = async () => {
    try {
      await axios.post("http://localhost:8080/api/mail", emailContent);
      await changeBookingStatus(bookingId, 3);
      setShowModal(false);
      window.location.reload();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  const openCompleteOrderModal = () => {
    setEmailContent((prev) => ({
      ...prev,
      subject: `Hoàn Thành Đơn Hàng #${bookingId}`,
      messageBody: `Đơn hàng của quý khách với mã #${bookingId} đã được hoàn thành, vui lòng đến gặp nhân viên để nhận lại mẫu.`,
    }));
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailContent((prev) => ({ ...prev, [name]: value }));
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
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Chi Tiết Đơn Hàng #{bookingId}</h4>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết Mẫu</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((sample, index) => (
                <tr key={index} className={`hover:bg-gray-100 ${getStatusClass(sample.status)}`}>
                  <td className="py-4 px-4 align-middle">{sample.sampleId}</td>
                  <td className="py-4 px-4 align-middle">{sample.name}</td>
                  <td className="py-4 px-4 align-middle">{sample.size}</td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}>
                    {getSampleStatusMeaning(sample.status)}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="text-sm text-gray-600 mt-1">
                      {sample.cancelReason ? (
                        `Lý Do Huỷ: ${sample.cancelReason}`
                      ) : (
                        <>
                          Type: {sampleDetails[sample.sampleId]?.type || ''}, Shape: {sampleDetails[sample.sampleId]?.shape || ''}, Color: {sampleDetails[sample.sampleId]?.color || ''}, 
                          Clarity: {sampleDetails[sample.sampleId]?.clarity || ''}, Polish: {sampleDetails[sample.sampleId]?.polish || ''}, Symmetry: {sampleDetails[sample.sampleId]?.symmetry || ''}, 
                          Fluorescence: {sampleDetails[sample.sampleId]?.fluorescence || ''}, Weight: {sampleDetails[sample.sampleId]?.weight || ''}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={openCompleteOrderModal}
          >
            Hoàn Thành
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
        </div>
      </div>

      {/* Email Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Gửi Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="toEmail">
              <Form.Label>To Email</Form.Label>
              <Form.Control
                type="email"
                name="toEmail"
                value={emailContent.toEmail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={emailContent.subject}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={emailContent.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="messageBody">
              <Form.Label>Message Body</Form.Label>
              <Form.Control
                as="textarea"
                name="messageBody"
                rows={3}
                value={emailContent.messageBody}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="senderName">
              <Form.Label>Sender Name</Form.Label>
              <Form.Control
                type="text"
                name="senderName"
                value={emailContent.senderName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={completeOrder}>
            Gửi Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingDetails;

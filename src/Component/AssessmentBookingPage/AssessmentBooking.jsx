import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./AssessmentBooking.css";
import { Modal, Button, Form } from "react-bootstrap";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import { handleSession } from "../../utils/sessionUtils";
import Pagination from "../Paginate/Pagination";
import { BOOKING_SAMPLES_URL } from "../../utils/apiEndPoints";
import getBookingFromId from "../../utils/getBookingFromId";
import { parse, isBefore, differenceInHours } from 'date-fns';
import { checkServiceTypeFromBooking } from "../../utils/checkServiceTypeFromBookingId";
import { cancelSample } from "../../utils/changeSampleStatus";
import { toast, ToastContainer } from 'react-toastify';
import { ASSESSMENT_PAPER_URL } from "../../utils/apiEndPoints";

function AssessmentBooking() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedAccount, setLoggedAccount] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [cancelSampleId, setCancelSampleId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const itemsPerPage = 10;
  const [assessmentPapers, setAssessmentPapers] = useState([]);
  

  useEffect(() => {
    const initialize = async () => {
      const loggedAccount = handleSession(navigate);
      if (loggedAccount) {
        setLoggedAccount(loggedAccount);
        try {
          const [samplesResponse, accountsResponse, assessmentPapers] = await Promise.all([
            axios.get(`${BOOKING_SAMPLES_URL}/assessment-account/${loggedAccount.accountId}`),
            axios.get('https://das-backend.fly.dev/api/accounts'),
            axios.get(ASSESSMENT_PAPER_URL),
          ]);
          const samplesData = samplesResponse.data;

          const samplesWithReturnDate = await Promise.all(samplesData.map(async (sample) => {
            try {
              const booking = await getBookingFromId(sample.bookingId);
              return {
                ...sample, samplereturndate: booking.sampleReturnDate, phone: booking.phone
              };
            } catch (error) {
              console.error(`Error fetching booking for sample ${sample.bookingId}:`, error);
              return { ...sample, samplereturndate: null, phone: null };
            }
          }));

          setSamples(samplesWithReturnDate);
          setAccounts(accountsResponse.data);
          setAssessmentPapers(assessmentPapers.data);
        } catch (error) {
          console.error("Error fetching the samples or accounts:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initialize();
  }, [navigate]);

  useEffect(() => {
    const filteredSamples = samples.filter(sample => {
      const account = accounts.find(account => account.accountId === sample.accountId);
      return account && (
        (account.phone?.includes(searchQuery) || '') ||
        (account.email?.includes(searchQuery) || '')
      );
    });

    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredSamples.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredSamples.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, samples, searchQuery, accounts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % samples.length;
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

  const findDiamondId = async (sampleId) => {
    try {
      const matchedSample = assessmentPapers.find(sample => sample.sampleId === sampleId);
      return matchedSample ? matchedSample.diamondId : null;
    } catch (error) {
      console.error(`Error fetching diamondId for sample ${sampleId}:`, error);
      return null;
    }
  };

  const handleShowDetails = async (sample) => {
    if (sample.status === 4) {
      alert(`Lý do hủy: ${sample.cancelReason}`);
      return;
    }
    if (sample.status === 1) {
      alert("Không thể giám định đơn hàng này");
      return;
    }
    if (sample.status === 3){
      const diamondId = await findDiamondId(sample.sampleId);
      if (diamondId) {
        navigate(`/assessmentstaff/assessmentpaperlist/${diamondId}`);
      } else {
        alert("Không thể tìm thấy Diamond ID");
      }
      return;
    }
    try {
      const serviceType = await checkServiceTypeFromBooking(sample.bookingId);
      if (serviceType === 1) {
        navigate(`/assessmentstaff/assessmentbooking/${sample.sampleId}/info`);
      } else if (serviceType === 2) {
        navigate(`/assessmentstaff/sealform/${sample.sampleId}`, { state: { sample, bookingId: sample.bookingId } });
      } else {
        alert("Invalid service type!");
      }
    } catch (error) {
      console.error("Error checking service type:", error);
    }
  };

  const getReturnDateStatusClass = (returnDate, status) => {
    if (status > 2) {
      return "";
    }

    const now = new Date();

    if (!returnDate) {
      return "";
    }

    const returnDateTime = parse(returnDate, 'yyyy/MM/dd - HH:mm:ss', new Date());

    if (isBefore(now, returnDateTime)) {
      const diffInHours = differenceInHours(returnDateTime, now);

      if (diffInHours <= 3) {
        return "bg-yellow-200";
      }
    }

    if (isBefore(returnDateTime, now)) {
      return "bg-red-200";
    }

    return "";
  };

  const handleCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Lý do hủy không được để trống");
      return;
    }

    try {
      const requestBody = JSON.stringify(cancelReason);
      console.log("Canceling sample with ID:", cancelSampleId);
      console.log("Cancel reason:", cancelReason);
      console.log("Cancel reason:", requestBody);


      await cancelSample(cancelSampleId, requestBody);
      toast.success("Mẫu đã được hủy thành công!");

      setTimeout(() => window.location.reload(), 2000);
      //
    } catch (error) {
      console.error("Error canceling sample:", error);
    } finally {
      setShowModal(false);
      setCancelReason("");

    }
  };

  const openCancelModal = (sampleId) => {
    const sample = samples.find(sample => sample.sampleId === sampleId);
    if (sample.status === 2) {
      setCancelReason(sample.cancelReason || "");
      setCancelSampleId(sampleId);
      setShowModal(true);

    } else if (sample.status === 3 || sample.status === 4) {
      window.alert("Không Thể Hủy Mẫu Khi Đã Hoàn Thành/Đã Hủy");
      return;
    } else {
      setCancelReason("");
      setCancelSampleId(sampleId);
      setShowModal(true);
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
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đặt Hẹn</h4>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by phone number or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                <th className="py-4 px-4 text-center align-middle">Thời Hạn</th>
                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
                <th className="py-4 px-4 text-center align-middle">Hủy</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentItems.map((sample) => (
                <tr
                  key={sample.sampleId}
                  className={`hover:bg-gray-100 ${getReturnDateStatusClass(sample.samplereturndate, sample.status)}`}
                >
                  <td className="py-4 px-4 align-middle">{`#${sample.bookingId}`}</td>
                  <td className="py-4 px-4 align-middle">{`${sample.name}`}</td>
                  <td className="py-4 px-4 align-middle">{sample.size}</td>
                  <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}>
                    <h3>{getSampleStatusMeaning(sample.status)}</h3>
                  </td>
                  <td className="py-4 px-4 align-middle">{sample.samplereturndate}</td>
                  <td className="py-4 px-4 align-middle">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleShowDetails(sample)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <button
                      className="text-red-500 underline"
                      onClick={() => openCancelModal(sample.sampleId)}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Hủy Mẫu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="cancelReason">
              <Form.Label>Lý do hủy</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleCancel}>
            Xác nhận hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssessmentBooking;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AssessmentBooking.css";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";
import Spinner from "../Spinner/Spinner";
import { handleSession } from "../../utils/sessionUtils";
import Pagination from "../Paginate/Pagination";
import { BOOKING_SAMPLES_URL } from "../../utils/apiEndPoints";
import getBookingFromId from "../../utils/getBookingFromId";
import { parse, isBefore, differenceInHours } from 'date-fns';
import { checkServiceTypeFromBooking } from "../../utils/checkServiceTypeFromBookingId";

function AssessmentBooking() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggedAccount, setLoggedAccount] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state
  const itemsPerPage = 10;

  useEffect(() => {
    const initialize = async () => {
      const loggedAccount = handleSession(navigate);
      if (loggedAccount) {
        setLoggedAccount(loggedAccount);
        try {
          const response = await axios.get(`${BOOKING_SAMPLES_URL}/assessment-account/${loggedAccount.accountId}`);
          const samplesData = response.data;

          const samplesWithReturnDate = await Promise.all(samplesData.map(async (sample) => {
            try {
              const booking = await getBookingFromId(sample.bookingId);
              return { ...sample, samplereturndate: booking.sampleReturnDate, phone: booking.phone };
            } catch (error) {
              console.error(`Error fetching booking for sample ${sample.bookingId}:`, error);
              return { ...sample, samplereturndate: null, phone: null };
            }
          }));

          setSamples(samplesWithReturnDate);
        } catch (error) {
          console.error("Error fetching the samples:", error);
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
    const filteredSamples = samples.filter(sample => sample.phone.includes(searchQuery));
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(filteredSamples.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredSamples.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, samples, searchQuery]);

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

  const handleShowDetails = async (sample) => {
    if (sample.status === 1 || sample.status === 3 || sample.status === 4) {
      window.alert("Không thể giám định đơn hàng này");
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
      return ""; // Don't apply color change for statuses greater than 2
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
            placeholder="Search by phone number"
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
                  <td className="py-4 px-4 align-middle">
                    {sample.samplereturndate ? (
                      <span>{sample.samplereturndate}</span>
                    ) : (
                      <span>Chưa có thông tin</span>
                    )}
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => handleShowDetails(sample)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      </div>
    </div>
  );
}

export default AssessmentBooking;

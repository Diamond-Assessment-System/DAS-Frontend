import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AssessmentBooking.css";
import { getSampleStatusMeaning } from "../../utils/getStatusMeaning";

function AssessmentBooking() {
  const navigate = useNavigate();
  const [samples, setSamples] = useState([]);


  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await axios.get("https://das-backend.fly.dev/api/booking-samples");
        setSamples(response.data);
      } catch (error) {
        console.error("Error fetching the samples:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount
  // const getStatusClass = (status) => {
  //   switch (status) {
  //     case 'Pending':
  //       return 'text-yellow-500';
  //     case 'Completed':
  //       return 'text-green-500';
  //     case 'Cancelled':
  //       return 'text-red-500';
  //     default:
  //       return 'text-gray-500';
  //   }
  // };

  const getStatusClass = (status) => {
    switch (status) {
      case 3:
        return "status-completed";
      case 4:
        return "status-canceled";
      case 2:
        return "status-assessing";
      case 1:
        return "status-opened"
      default:
        return "";
    }
  };

  const handleShowDetails = (sample) => {
    switch (sample.status) {
      case 2:
        navigate(`/assessmentstaff/assessmentbooking/${sample.sampleId}/selection`);
        break;
      case 3: //hoan thanh
        navigate(`/consultingstaff/assessmentpaperlist/${sample.sampleId}`)
        break;
      case 4:
        alert("Yêu cầu đã bị hủy!");
        break;
      default:
        alert("Invalid!");
        break;
    }

  };
//  const [bookings] = useState([
//     { bookingId: 1, serviceId: 1, quantity: 3, dateCreated: '2023-06-15', status: 'Pending' },
//     { bookingId: 2, serviceId: 2, quantity: 1, dateCreated: '2023-06-14', status: 'Completed' },
//     { bookingId: 3, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 4, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 5, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 6, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 7, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 8, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 9, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
//     { bookingId: 10, serviceId: 3, quantity: 5, dateCreated: '2023-06-13', status: 'Cancelled' },
    
//   ]);
  return (
    <div>

      <div className="w-full">
        <div className="max-w-full mx-auto p-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Danh Sách Đặt Hẹn</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-4 px-4 text-center align-middle">Mã đơn hàng</th>
                  <th className="py-4 px-4 text-center align-middle">Tên mẫu</th>
                  <th className="py-4 px-4 text-center align-middle">Kích cỡ</th>
                  <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                  <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {samples.map((sample) => (
                  <tr key={sample.sampleId}>
                    <td className="py-4 px-4 align-middle">{`#${sample.bookingId}`}</td>
                    <td className="py-4 px-4 align-middle">{`${sample.name}`}</td>
                    <td className="py-4 px-4 align-middle">{sample.size}</td>
                    <td className={`py-4 px-4 align-middle ${getStatusClass(sample.status)}`}><h3>{getSampleStatusMeaning(sample.status)}</h3></td>
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
        </div>
      </div>
    </div>
  );
}

export default AssessmentBooking;

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AssessmentPaperReprinted/ReprintedBooking.css";
import Spinner from "../Spinner/Spinner";
import { ASSESSMENT_REQUEST_URL, SERVICES_URL } from "../../utils/apiEndPoints";
import moment from "moment";
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";

function ReprintedBooking() {
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("tatca");

    const getStatusClass = (status) => {
        switch (status) {
            case 1:
                return "status-pendingg";
            case 2:
                return "status-createdd";
            case 3:
                return "status-completedd";
            default:
                return "text-gray-500";
        }
    };


    const getServiceName = (serviceId) => {
        const service = services.find((service) => service.serviceId === serviceId);
        return service ? service.serviceName : "Không xác định";
    };

    useEffect(() => {
        const fetchBookingsAndServices = async () => {
            try {
                const bookingsResponse = await axios.get(ASSESSMENT_REQUEST_URL);
                const servicesResponse = await axios.get(SERVICES_URL);

                setBookings(bookingsResponse.data);
                setServices(servicesResponse.data);
            } catch (error) {
                console.error("Error fetching the bookings or services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingsAndServices();
    }, []);

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleCreateBooking = (booking) => {
        switch (booking.status) {
            case 1:
                navigate(`lookuppaper/${booking.bookingId}`);
                break;
            case 2:
                navigate(`lookuppaper`);
                break;
            case 3:
                alert("Yêu cầu đã hoàn tất rồi, không thể tạo lại!");
                break;
            case 4:
                alert("Yêu cầu đã bị hủy!");
                break;
            default:
                alert("Yêu cầu chưa được chấp nhận, vui lòng thử lại");
                break;
        }
    };
    const getBackgroundColor = (dateCreated, status) => {
        if (status !== 1) return "";
        const dateDiff = moment().diff(moment(dateCreated), 'days');
        if (dateDiff > 5) return "bg-red-500";
        if (dateDiff > 3) return "bg-yellow-500";
        return "";
    };
    const filteredBookings = bookings
        .filter((booking) => {
            const service = services.find((service) => service.serviceId === booking.serviceId);
            return service && service.serviceType === 3;
        })
        .filter((booking) => {
            if (selectedStatus === "tatca") return true;
            if (selectedStatus === "dangcho") return booking.status === 1;
            if (selectedStatus === "datao") return booking.status === 2;
            if (selectedStatus === "dahoantat") return booking.status === 3;
            if (selectedStatus === "dahuy") return booking.status === 4;
            return false;
        });

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
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Cấp Lại Giấy Giám Định
                </h4>
                <div className="radio-group">
                    <input
                        type="radio"
                        id="status1"
                        name="status"
                        value="tatca"
                        checked={selectedStatus === "tatca"}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="status1">Tất Cả</label>
                    <input
                        type="radio"
                        id="status2"
                        name="status"
                        value="dangcho"
                        checked={selectedStatus === "dangcho"}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="status2">Đang Chờ</label>
                    <input
                        type="radio"
                        id="status3"
                        name="status"
                        value="datao"
                        checked={selectedStatus === "datao"}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="status3"> Đã Tạo </label>
                    <input
                        type="radio"
                        id="status4"
                        name="status"
                        value="dahoantat"
                        checked={selectedStatus === "dahoantat"}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="status4">Đã Hoàn Tất</label>
                    <input
                        type="radio"
                        id="status5"
                        name="status"
                        value="dahuy"
                        checked={selectedStatus === "dahuy"}
                        onChange={handleStatusChange}
                    />
                    <label htmlFor="status5"> Đã Huỷ</label>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-4 px-4 text-center align-middle">Mã yêu cầu</th>
                                <th className="py-4 px-4 text-center align-middle">Dịch vụ</th>
                                <th className="py-4 px-4 text-center align-middle">
                                    Số Lượng Kim Cương
                                </th>
                                <th className="py-4 px-4 text-center align-middle">Ngày tạo</th>
                                <th className="py-4 px-4 text-center align-middle">Trạng Thái</th>
                                <th className="py-4 px-4 text-center align-middle">Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredBookings.map((booking) => (
                                <tr key={booking.bookingId} className={`hover:bg-gray-100 ${getBackgroundColor(booking.dateCreated, booking.status)}`}>
                                    <td className="py-4 px-4 align-middle ">{`#${booking.bookingId}`}</td>
                                    <td className="py-4 px-4 align-middle">
                                        {getServiceName(booking.serviceId)}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        {booking.quantities}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        {booking.dateCreated}
                                    </td>
                                    <td className={`py-4 px-4 align-middle ${getStatusClass(booking.status)}`}>
                                        <h3>{getBookingStatusMeaning(booking.status)}</h3>
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleCreateBooking(booking)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Cấp Lại Giấy Giám Định
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
    );
}

export default ReprintedBooking;

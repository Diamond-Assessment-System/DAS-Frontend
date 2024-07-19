import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../AssessmentPaperReprinted/ReprintedBooking.css";
import Spinner from "../Spinner/Spinner";
import getAllBookings from "../../utils/getAllBookingsForConsulting"; // Import the getAllBookings function
import { getBookingStatusMeaning } from "../../utils/getStatusMeaning";
import { getAllServices } from "../../utils/getAllServices"; // Import the getAllServices function

function SealDiamondPage() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingsAndServices = async () => {
            try {
                const allBookings = await getAllBookings(); // Fetch all bookings
                const allServices = await getAllServices(); // Fetch all services
                console.log("All Bookings:", allBookings); // Debug: Check if data is fetched
                console.log("All Services:", allServices); // Debug: Check if data is fetched

                // Filter bookings to only include those with serviceType = 2
                const filteredBookings = allBookings.filter(booking => {
                    const service = allServices.find(service => service.serviceId === booking.serviceId);
                    return service && service.serviceType === 2;
                });
                console.log("Filtered Bookings:", filteredBookings); // Debug: Check filtered data

                setBookings(filteredBookings);
                setServices(allServices);
            } catch (error) {
                console.error("Error fetching the bookings or services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingsAndServices();
    }, []);

    const handleCreateBooking = (booking) => {
        navigate(`/lookuppaper/${booking.bookingId}`);  // Added bookingId to the URL path
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
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Niêm Phong
                </h4>
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
                            {bookings.map((booking) => (
                                <tr key={booking.bookingId} className="hover:bg-gray-100">
                                    <td className="py-4 px-4 align-middle">{`#${booking.bookingId}`}</td>
                                    <td className="py-4 px-4 align-middle">
                                        {booking.serviceName}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        {booking.quantities}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        {booking.dateCreated}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        {getBookingStatusMeaning(booking.status)}
                                    </td>
                                    <td className="py-4 px-4 align-middle">
                                        <div className="flex items-center justify-center">
                                            <button
                                                onClick={() => handleCreateBooking(booking)}
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            >
                                                Tạo đơn niêm phong
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

export default SealDiamondPage;

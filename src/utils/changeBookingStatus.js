import axios from 'axios';

const API_URL = 'http://localhost:8080/api/assessment-bookings';

export const changeBookingStatus = async (bookingId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${bookingId}/status/${status}`);
        return response.data;
    } catch (error) {
        console.error('Error changing user status:', error);
        throw error;
    }
};

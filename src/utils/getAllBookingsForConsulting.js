// getAllBookings.js

import axios from 'axios';

async function getAllBookingsForConsulting() {
    try {
        const response = await axios.get('http://localhost:8080/api/assessment-bookings/ordered');
        const bookings = response.data;

        const bookingHistory = await Promise.all(
            bookings.map(async (booking) => {

                const serviceResponse = await axios.get(`http://localhost:8080/api/services/${booking.serviceId}`);

                return {
                    ...booking,
                    serviceName: serviceResponse.data.serviceName,
                };
            })
        );

        return bookingHistory;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with a status:', error.response.status);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('Request made but no response received:', error.request);
        } else {
            console.error('Error setting up the request:', error.message);
        }
        throw error; // Rethrow the error to handle it in the component
    }
}

export default getAllBookingsForConsulting;

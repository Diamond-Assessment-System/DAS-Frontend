import axios from 'axios';

export const checkServiceTypeFromBooking = async (bookingId) => {
    try {
        const response = await axios.get(`https://das-backend.fly.dev/api/assessment-bookings/${bookingId}`);
        //const bookingData = response.data;
        const id =  response.data.serviceId;
        const response2 = await axios.get(`https://das-backend.fly.dev/api/services/${id}`);
        return response2.data.serviceType;
    } catch (error) {
        console.error('Error fetching service type data:', error);
        throw error;
    }
};


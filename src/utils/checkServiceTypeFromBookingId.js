import axios from 'axios';

export const checkServiceTypeFromBooking = async (bookingId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/assessment-bookings/${bookingId}`);
        //const bookingData = response.data;
        const id =  response.data.serviceId;
        const response2 = await axios.get(`http://localhost:8080/api/services/${id}`);
        return response2.data.serviceType;
    } catch (error) {
        console.error('Error fetching service type data:', error);
        throw error;
    }
};


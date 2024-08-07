import axios from 'axios';

async function getAllBookings() {
  try {
    const response = await axios.get('https://das-backend.fly.dev/api/assessment-bookings/ordered');
    const bookings = response.data;

    const bookingHistory = await Promise.all(
      bookings.map(async (booking) => {
        const accountResponse = await axios.get(`https://das-backend.fly.dev/api/accounts/${booking.accountId}`);
        const serviceResponse = await axios.get(`https://das-backend.fly.dev/api/services/${booking.serviceId}`);
        
        return {
          ...booking,
          accountName: accountResponse.data.displayName,
          serviceName: serviceResponse.data.serviceName,
          accountMail: accountResponse.data.email,
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

export default getAllBookings;

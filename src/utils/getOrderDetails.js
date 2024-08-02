// utils/getOrderDetails.js

import axios from 'axios';

async function getOrderDetails(bookingId) {
  try {
    const bookingResponse = await axios.get(`http://localhost:8080/api/assessment-bookings/${bookingId}`);
    const booking = bookingResponse.data;

    const accountResponse = await axios.get(`http://localhost:8080/api/accounts/${booking.accountId}`);
    const serviceResponse = await axios.get(`http://localhost:8080/api/services/${booking.serviceId}`);

    return {
      ...booking,
      accountName: accountResponse.data.displayName,
      serviceName: serviceResponse.data.serviceName,
    };
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

export default getOrderDetails;

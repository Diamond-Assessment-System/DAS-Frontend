import axios from 'axios';
import { ASSESSMENT_BOOKING_URL } from './apiEndPoints'; // Ensure you have this endpoint defined

export const getBookingDetails = async (bookingId) => {
  try {
    const response = await axios.get(`${ASSESSMENT_BOOKING_URL}/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
};

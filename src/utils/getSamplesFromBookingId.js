import axios from 'axios';
import { API_BASE_URL } from './apiEndPoints';

const URL = `${API_BASE_URL}/api/booking-samples`;

export const getBookingSamplesByBookingId = async (bookingId) => {
  try {
    const response = await axios.get(`${URL}/booking/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking samples by booking ID:', error);
    throw error;
  }
};

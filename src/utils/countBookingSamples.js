import axios from "axios";
import { BOOKING_SAMPLES_URL } from "./apiEndPoints";


const countAllBookingSamplesByBookingId = async (bookingId) => {
  try {
    const response = await axios.get(`${BOOKING_SAMPLES_URL}/count`, {
      params: { bookingId }
    });
    return response.data;
  } catch (error) {
    console.error(`There was an error counting booking samples for booking id ${bookingId}!`, error);
  }
};

const countBookingSamplesByBookingIdWithStatus1or2 = async (bookingId) => {
  try {
    const response = await axios.get(`${BOOKING_SAMPLES_URL}/count-by-status`, {
      params: { bookingId }
    });
    return response.data;
  } catch (error) {
    console.error(`There was an error counting booking samples with status 1 or 2 for booking id ${bookingId}!`, error);
  }
};

export {
  countAllBookingSamplesByBookingId,
  countBookingSamplesByBookingIdWithStatus1or2
};

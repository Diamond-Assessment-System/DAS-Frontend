import axios from 'axios';

const API_URL = 'https://das-backend.fly.dev/api/booking-samples';

export const changeSampleStatus = async (sampleId, status) => {
    try {
        const response = await axios.put(`${API_URL}/${sampleId}/status/${status}`);
        return response.data;
    } catch (error) {
        console.error('Error changing user status:', error);
        throw error;
    }
};

export const cancelSample = async (sampleId, reason) => {
    try {
      const response = await axios.put(`${API_URL}/${sampleId}/cancel`, reason, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error cancel booking:', error);
      throw error;
    }
  };

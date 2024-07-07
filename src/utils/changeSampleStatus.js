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
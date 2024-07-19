import axios from 'axios';

const API_URL = 'https://das-backend.fly.dev/api/accounts';

export const changeAccountStatus = async (accountId, status, reason) => {
  try {
    const response = await axios.put(`${API_URL}/${accountId}/status/${status}`, reason, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error changing user status:', error);
    throw error;
  }
};

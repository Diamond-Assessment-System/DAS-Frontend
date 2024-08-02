import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

export const updateProfile = async (accountId, info) => {
  try {
    const response = await axios.put(`${API_URL}/${accountId}`, info);
    return response.data;
  } catch (error) {
    console.error('Error changing user status:', error);
    throw error;
  }
};

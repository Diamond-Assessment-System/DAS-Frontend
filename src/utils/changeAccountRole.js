import axios from 'axios';

const API_URL = 'http://localhost:8080/api/accounts';

export const changeAccountRole = async (accountId, role) => {
    try {
      const response = await axios.put(`${API_URL}/${accountId}/role/${role}`);
      return response.data;
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
};

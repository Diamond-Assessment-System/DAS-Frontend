import axios from "axios";

export const getAllAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts");
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  };

export default getAllAccounts
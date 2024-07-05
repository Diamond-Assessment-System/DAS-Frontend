import axios from "axios";

export const getAllAccounts = async () => {
    try {
      const response = await axios.get("https://das-backend.fly.dev/api/accounts");
      return response.data;
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  };

export default getAllAccounts
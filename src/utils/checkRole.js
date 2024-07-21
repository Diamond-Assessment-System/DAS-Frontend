import axios from 'axios';

const API_URL = 'https://das-backend.fly.dev/api/accounts';

export const checkRole = async (accountId) => {
    try {
        const response = await axios.get(`${API_URL}/${accountId}`);
        const accountData = response.data;
        return accountData.role;
        //return 6;
    } catch (error) {
        console.error('Error fetching account data:', error);
        throw error;
    }
};


import axios from "axios";

export const getAllSeals = async () => {
    try {
        const response = await axios.get("https://das-backend.fly.dev/api/seals");
        return response.data;
    } catch (error) {
        console.error('Error fetching seals:', error);
        throw error;
    }
};

export default getAllSeals;

import axios from "axios";

export const getAllSeals = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/seals");
        return response.data;
    } catch (error) {
        console.error('Error fetching seals:', error);
        throw error;
    }
};

export default getAllSeals;

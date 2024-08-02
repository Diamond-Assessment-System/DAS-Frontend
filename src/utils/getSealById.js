import axios from "axios";

export const getSealById = async (sealId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/seals/${sealId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching seal with id ${sealId}:`, error);
        throw error;
    }
};

export default getSealById;

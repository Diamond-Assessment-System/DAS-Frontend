import axios from "axios"

async function getAccountFromRole(role){
    try {
        const response = await axios.get(`http://localhost:8080/api/accounts/role/${role}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server responded with a status:', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            console.error('Request made but no response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
          throw error;
    }
}

export default getAccountFromRole
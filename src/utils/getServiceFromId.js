// getServiceFromId.js

import axios from 'axios';

async function getServiceFromId(id) {
  try {
    const response = await axios.get(`https://das-backend.fly.dev/api/services/${id}`);
    return response.data; // Return the fetched service data
  } catch (error) {
    if (error.response) {
      console.error('Server responded with a status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('Request made but no response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error; // Rethrow the error to handle it in the component
  }
}

export default getServiceFromId;

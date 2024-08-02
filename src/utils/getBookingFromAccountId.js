// getBookingFromId.js

import axios from 'axios';

async function getBookingFromAccountId(accountId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/assessment-bookings/account/${accountId}`);
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

export default getBookingFromAccountId;
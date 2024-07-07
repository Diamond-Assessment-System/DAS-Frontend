import axios from 'axios';
import { API_BASE_URL } from './apiEndPoints';

const BASE_URL = `${API_BASE_URL}/api/services`; // Change this to your actual backend URL

export const getAllServices = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the services!', error);
    throw error;
  }
};

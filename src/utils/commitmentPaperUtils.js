import axios from 'axios';
import { COMMITMENT_PAPER_URL} from './apiEndPoints';

export const createCommitmentPaper = async (commitmentPaper) => {
  try {
    const response = await axios.post(COMMITMENT_PAPER_URL, commitmentPaper);
    return response.data;
  } catch (error) {
    console.error('Error creating commitment paper:', error);
    throw error;
  }
};

export const getCommitmentPaperById = async (id) => {
  try {
    const response = await axios.get(getCommitmentPaperUrl(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching commitment paper by id:', error);
    throw error;
  }
};

export const getAllCommitmentPapers = async () => {
  try {
    const response = await axios.get(COMMITMENT_PAPER_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all commitment papers:', error);
    throw error;
  }
};

export const updateCommitmentPaper = async (id, commitmentPaper) => {
  try {
    const response = await axios.put(getCommitmentPaperUrl(id), commitmentPaper);
    return response.data;
  } catch (error) {
    console.error('Error updating commitment paper:', error);
    throw error;
  }
};

export const deleteCommitmentPaper = async (id) => {
  try {
    const response = await axios.delete(getCommitmentPaperUrl(id));
    return response.data;
  } catch (error) {
    console.error('Error deleting commitment paper:', error);
    throw error;
  }
};

export const changeCommitmentPaperStatus = async (id, status) => {
  try {
    const response = await axios.patch(changeCommitmentPaperStatusUrl(id, status));
    return response.data;
  } catch (error) {
    console.error('Error changing commitment paper status:', error);
    throw error;
  }
};

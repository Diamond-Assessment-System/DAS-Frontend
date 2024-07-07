// src/api/servicePriceListService.js

import axios from "axios";
import { SERVICE_PRICE_LIST_URL } from "./apiEndPoints";

const getServicePriceListById = async (id) => {
  try {
    const response = await axios.get(`${SERVICE_PRICE_LIST_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the service price list with id ${id}!`, error);
  }
};

const getAllServicePriceLists = async () => {
  try {
    const response = await axios.get(SERVICE_PRICE_LIST_URL);
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the service price lists!', error);
  }
};

const updateServicePriceListPrice = async (id, initPrice, priceUnit) => {
  try {
    const response = await axios.patch(`${SERVICE_PRICE_LIST_URL}/${id}`, null, {
      params: {
        initPrice,
        priceUnit
      }
    });
    return response.data;
  } catch (error) {
    console.error(`There was an error updating the service price list with id ${id}!`, error);
  }
};

const createServicePriceList = async (data) => {
  try {
    const response = await axios.post(SERVICE_PRICE_LIST_URL, data);
    return response.data;
  } catch (error) {
    console.error('There was an error creating the service price list!', error);
  }
};

const deleteServicePriceList = async (id) => {
  try {
    const response = await axios.delete(`${SERVICE_PRICE_LIST_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error deleting the service price list with id ${id}!`, error);
  }
};

export {
  getServicePriceListById,
  getAllServicePriceLists,
  updateServicePriceListPrice,
  createServicePriceList,
  deleteServicePriceList
};

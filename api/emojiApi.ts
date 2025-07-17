import axios from 'axios';

const BASE_URL = 'https://emojihub.yurace.pro/api';

export const getAllEmojis = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (e) {}
};

export const getRandomEmoji = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random`);
    return response.data;
  } catch (e) {}
};


export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (e) {}
};



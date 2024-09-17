import axios from 'axios';

const API_URL = 'http://localhost:5000/api/homes'; // Your backend URL

export const fetchHomes = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching homes:', error);
    return [];
  }
};

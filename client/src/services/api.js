import axios from 'axios';
import { API_URL } from '../utils/key';

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

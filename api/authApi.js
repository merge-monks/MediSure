import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signupUser = async (userData) => {
  const response = await api.post('/signup', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/login', credentials);
  return response.data;
};

export const logoutUser = async () => {
  await api.get('/logout');
  await AsyncStorage.removeItem('authToken');
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/checkAuth');
    return response.data;
  } catch (error) {
    await AsyncStorage.removeItem('authToken');
    throw error;
  }
};

export default api;

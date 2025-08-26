import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000,
})

export default apiInstance;
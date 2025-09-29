import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { config } from "zod";
import { STORAGE_KEY } from "./const";

const baseURL = import.meta.env.VITE_API_URL;

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 3000,
})

export const apiInstanceAuth = axios.create({
  baseURL,
})

apiInstanceAuth.interceptors.request.use((config) => {
  const session = secureLocalStorage.getItem(STORAGE_KEY)

  if (!session) {
    return config;
  }
  config.headers.Authorization = `JWT ${session.token}`;
  return config;
})

export default apiInstance;
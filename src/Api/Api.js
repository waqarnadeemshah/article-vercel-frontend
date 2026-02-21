import axios from "axios";
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
let accesstoken = null;
export const setaccesstoken = (token) => {
  accesstoken = token;
};

API.interceptors.request.use((config) => {
  if (accesstoken) {
    config.headers = config.headers || null;
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }
  return config;
});

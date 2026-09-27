import axios from "axios";
import config from "@/config/venv";
import { getAccessToken } from "./authSession";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
});

axiosInstance.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});
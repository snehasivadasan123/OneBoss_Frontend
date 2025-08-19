

import axios from "axios";
import { logger } from "./logger";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});


//  Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    logger.debug("[Request]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    logger.debug("[Request Error]", error);
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.response.use(
  (response) => {
    logger.debug("[Response]", response.status, response.config.url);
    return response;
  },
  (error) => {
    logger.error("[Response Error]", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;

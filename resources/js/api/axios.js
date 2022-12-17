import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3069/api",
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
          return config;
      },
      error => {
          return Promise.reject(error);
      }
  );

export default axiosConfig

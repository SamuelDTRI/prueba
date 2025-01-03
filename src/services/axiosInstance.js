import axios from "axios";
import API_URL from "../../config/config";
import store from "../redux/store"; 

const axiosInstance = axios.create({
  baseURL: API_URL, // url para versatilidad de uso. 
  headers: {
    "Content-Type": "application/json",
  },
});

// intercepto el token desde redux para las peticiones.
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token && !config.url.includes("/login") && !config.url.includes("/user")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default axiosInstance;

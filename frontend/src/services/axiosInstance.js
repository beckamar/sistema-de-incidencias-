import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        Accept: 'application/json'
    }
});

export default axiosInstance;
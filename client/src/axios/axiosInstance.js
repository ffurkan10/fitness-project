import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/fitness/v1",
  headers: {
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  console.log("Token:", token);
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Örn: token süresi dolduysa logout yap
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;




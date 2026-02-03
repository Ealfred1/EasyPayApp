import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://easypayvtu-pal6.onrender.com/",
  // baseURL: 'http://127.0.0.1:8000/',
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  console.log('🚀 [REQUEST] URL:', request.baseURL ? request.baseURL + request.url : request.url);
  console.log('📦 [REQUEST] Payload:', JSON.stringify(request.data));
  return request;
});

export default axiosInstance;

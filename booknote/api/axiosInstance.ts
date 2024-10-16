import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true // API 기본 URL
});

axiosInstance.interceptors.response.use(
  (response) => {       
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 응답을 받은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 요청 재시도 여부 플래그      
      await fetch("/api/token/refresh")     
      return axiosInstance(originalRequest);
    }

    // 에러 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios from "axios";
import { getAccessToken, logout } from '../stores/AccessTokenStore';

const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: 'http://localhost:3001',
  })

  if (useAccessToken) {
    http.interceptors.request.use((config) => {
      const token = getAccessToken();

      console.log('token', token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
     
      if (error?.response?.status && [401, 403].includes(error.response.status)) {
        if (getAccessToken()) {
          logout();

          if (window.location.pathname !== '/login') {
            window.location.assign('/login');
          }
        }
      }

      return Promise.reject(error);
    }
  )

  return http;
}

export default createHttp;
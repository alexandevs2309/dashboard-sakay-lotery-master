import axios from 'axios'
import Cookies from 'js-cookie';

export const apiClient =  axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
apiClient.interceptors.request.use(
    config => {
      const token = Cookies.get('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export default apiClient;
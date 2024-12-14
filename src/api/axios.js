import { logout } from '@/service/AuthService';
import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    config => {
        const token = Cookies.get('token');
        console.log(Cookies.get('token'))
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    error => Promise.reject(error)
);

// Interceptor para manejar errores en las respuestas
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Evitar bucles de reintento
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = Cookies.get('refresh_token');
                if (refreshToken) {
                    const { data } = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                        refresh: refreshToken,
                    }, {
                        // Añadir timeout
                        timeout: 5000 
                    });

                    Cookies.set('token', data.access, { expires: 1 });
                    originalRequest.headers.Authorization = `Bearer ${data.access}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error detallado al renovar el token:', {
                    message: refreshError.message,
                    status: refreshError.response?.status,
                    data: refreshError.response?.data
                });
                
               logout()
            }
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;

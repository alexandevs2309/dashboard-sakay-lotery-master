// api/axios.js

import { logout } from '@/service/AuthService'
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
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);
const csrfToken = Cookies.get('csrftoken');

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

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
                        timeout: 5000
                    });

                    Cookies.set('token', data.access, { expires: 1 });
                    originalRequest.headers.Authorization = `Bearer ${data.access}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error al renovar el token:', refreshError);

                // Manejar el error de actualización del token, por ejemplo, cerrar la sesión
                logout();
            }
        }

        // Manejar otros errores con mensajes más específicos
        if (error.response) {
            // El servidor respondió con un estado diferente a 2xx
            let errorMessage = 'Error en la respuesta del servidor.';
            if (error.response.status === 400) {
                // Error de validación o solicitud incorrecta
                errorMessage = 'Error en la solicitud. Revisa los datos ingresados.';
            } else if (error.response.status === 500) {
                // Error interno del servidor
                errorMessage = 'Error interno del servidor. Inténtalo de nuevo más tarde.';
            }
            console.error(errorMessage, error.response.data);
            // Mostrar el mensaje de error al usuario (puedes usar un Toast o un Alert)
             this.$toast.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 }); 
        } else if (error.request) {
            // La solicitud se hizo pero no se recibió respuesta
            console.error('Error en la solicitud:', error.request);
            // Mostrar un mensaje de error genérico al usuario
             this.$toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo conectar al servidor.', life: 3000 }); 
        } else {
            // Algo sucedió al configurar la solicitud que provocó un error
            console.error('Error:', error.message);
            // Mostrar un mensaje de error genérico al usuario
            this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Ocurrió un error inesperado.', life: 3000 }); 
        }

        return Promise.reject(error);
    }
);

export default apiClient;
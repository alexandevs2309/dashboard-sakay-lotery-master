import apiClient from '@/api/axios';
import router from '@/router';
import Cookies from 'js-cookie'; 

export function login(email, password) {
  return apiClient.post('/token/', { email, password })
    .then(response => {
      console.log('Respuesta del login:', response.data);

      if (response.data && response.data.access && response.data.user && typeof response.data.user === 'object') {
        // Guardar el token en una cookie con HttpOnly
        Cookies.set('token', response.data.access, { expires: 7, httpOnly: true });

        // Guardar usuario en una cookie 
        Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 }); 

        // Devolver la respuesta para que el componente pueda manejarla
        return response; 
      } else {
        console.error('La respuesta del servidor no contiene información de usuario válida.');
        throw new Error('La respuesta del servidor no contiene información de usuario válida.');
      }
    })
    .catch(error => {
      console.error('Error durante el login:', error);
      throw error; // Re-lanzar el error para que el componente pueda manejarlo
    });
}
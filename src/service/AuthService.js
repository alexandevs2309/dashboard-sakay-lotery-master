import apiClient from '@/api/axios';
import router from '@/router';
import Cookies from 'js-cookie'; 

export function login(email, password) {
  return apiClient.post('/token/', { email, password })
    .then(response => {
      console.log('Respuesta del login:', response.data);

      if (response.data && response.data.access && response.data.refresh && response.data.user && typeof response.data.user === 'object') {
        // Guardar el token de acceso
        Cookies.set('token', response.data.access, { expires: 1 });
        
        // Guardar el refresh token
        Cookies.set('refresh_token', response.data.refresh, { expires: 7 });

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

export function enableTwoFactor() {
  return apiClient.post('/2fa/toggle/', { enable_2fa: true })
    .then(response => {
      console.log('2FA habilitado:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Error al habilitar 2FA:', error);
      throw error;
    });
}


export function verifyTwoFactorCode(code) {
  return apiClient.post('/2fa/verify/', { code })
    .then(response => {
      console.log('Código 2FA verificado:', response.data);
      return response;
    })
    .catch(error => {
      console.error('Error al verificar el código 2FA:', error);
      throw error;
    });
}


export function logout() {
  // Limpiar todas las cookies relacionadas con la autenticación
  console.log("Ejecutando logout..."); // Agrega esta línea
  Cookies.remove('token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  
  // Redirigir al login
  router.push('/login');
}
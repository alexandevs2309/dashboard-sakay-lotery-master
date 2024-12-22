import apiClient from '@/api/axios';
import router from '@/router';
import Cookies from 'js-cookie'; 

export function login(email, password, rememberMe = false) {
  return apiClient.post('/token/', { email, password })
    .then(response => {

      if (response.data && response.data.access && response.data.refresh && response.data.user && typeof response.data.user === 'object') {
        // Configuración de expiración según Remember Me
        const cookieOptions = rememberMe 
          ? { expires: 7 } // 7 días si Remember Me está activo
          : undefined;     // Sin fecha de expiración, cookies de sesión

        // Guardar el token de acceso
        Cookies.set('token', response.data.access, cookieOptions);

        // Guardar el refresh token
        Cookies.set('refresh_token', response.data.refresh, cookieOptions);

        // Guardar usuario en una cookie
        Cookies.set('user', JSON.stringify(response.data.user), cookieOptions);

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

export async function enableTwoFactor() {
  try {
    const response = await apiClient.post('/2fa/toggle/', { enable_2fa: true });
    console.log('2FA habilitado:', response.data);
    return response;
  } catch (error) {
    console.error('Error al habilitar 2FA:', error);
    throw error;
  }
}


export async function verifyTwoFactorCode(code) {
  try {
    const response = await apiClient.post('/two_factor/verify/', { code });
    console.log('Código 2FA verificado:', response.data);
    return response;
  } catch (error) {
    console.error('Error al verificar el código 2FA:', error);
    throw error;
  }
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
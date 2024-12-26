// src/stores/authStore.js
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';


// Supongamos que tienes un método en el store para configurar el estado
const loginUser = (userData) => {
  this.user = userData.user; // Guarda el usuario
  this.token = userData.token; // Guarda el token

  // Guardar en las cookies
  Cookies.set('token', userData.token);
  Cookies.set('user', JSON.stringify(userData.user));
};
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,  // Aquí almacenamos el token, pero desde las cookies
    user: null,   // Información del usuario (si es necesario)
  }),

  actions: {
    // Establecer el token en las cookies
    setToken(token) {
      this.token = token;
      Cookies.set('auth_token', token, { expires: 7, secure: true, sameSite: 'Strict' });  // Guardamos el token con expiración de 7 días
    },

    // Eliminar el token (logout)
    logout() {
      this.token = null;
      this.user = null;
      Cookies.remove('auth_token');  // Eliminamos la cookie
    },

    // Verificar si el token existe en las cookies
    isAuthenticated() {
      // Revisamos si el token está en las cookies
      return !!Cookies.get('auth_token');
    },

    // Establecer la información del usuario
    setUser(user) {
      this.user = user;
    },

    // Obtener el token desde las cookies (por si lo necesitamos)
    getToken() {
      return Cookies.get('auth_token');
    }
  }
});

import {defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isLoggedIn: false,
    }),
    actions: {
        login(user, token) {
            this.user = user;
            this.token = token;
            this.isLoggedIn = true;
        },
        logout() {
            this.user = null;
            this.token = null;
            this.isLoggedIn = false;
        },
      
        setToken(token) {
            this.token = token;
        },
       
        setUser(user) {
            this.user = user;
        },
        getIsLoggedIn() {
            return this.isLoggedIn;
        }
    },
    persist: true
})
import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://127.0.0.1:8000/api/profile/';  // El endpoint para obtener y actualizar el perfil del usuario

function getAuthHeaders() {
    const token = Cookies.get('token');
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    return {};
}

export const ProfileService = {
    // Obtener el perfil del usuario
    async getProfile() {
        try {
            const response = await axios.get(API_URL, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error('Error al obtener el perfil:', error);
            throw error;
        }
    },

    // Actualizar el perfil del usuario
    async updateProfile(profileData) {
        try {
            const response = await axios.put(API_URL, profileData, { headers: getAuthHeaders() });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            throw error;
        }
    }
};

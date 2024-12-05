import apiClient from '../api/axios';

// Función para obtener las bancas
export const fetchBancas = async () => {
  try {
    const response = await apiClient.get('/bancas/'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching bancas:', error);
    throw error;  
  }
};

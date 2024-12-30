import apiClient from "@/api/axios";


export const getResults = async (date) => {

    try {
        const response = await apiClient.get('/resultados/', {
            params: {
                fecha: date
            }
        });
        return response.data;
        
    } catch (error) {
        console.error('Error al obtener los resultados:', error);
        return null;
        
    }
};

export const searchLotteryResult = async (name, date) => {
    try {
        const response = await apiClient.get('/search/', {
            params: {
                date,
                name
            },
        });
        return response.data;
        
    } catch (error) {
        console.error('Error al buscar los resultados:', error);
        return null;
        
    }
};
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api/bancas/';

export const BancaService = {
    async getBancasData() {
        try {
            const response = await axios.get(API_URL);
            console.log("Bancas recibidas del backend:", response.data);
            // Imprime los IDs para verificar
            response.data.forEach(banca => {
                console.log(`Banca ID: ${banca.id}, Nombre: ${banca.nombre}`);
            });
            return response.data;
        } catch (error) {
            console.error('Error al obtener las bancas:', error);
            throw error;
        }
    
    },

    async createBanca(bancaData) {
        try {
            const response = await axios.post(API_URL, bancaData);
            return response.data;
        } catch (error) {
            console.error('Error al crear la banca:', error);
            throw error;
        }
    },

    async getBancaById(id) {
        try {
            console.log("Intentando obtener banca con ID:", id);
            
            const url = `${API_URL}${id}/`;
            console.log("URL completa:", url);
    
            const response = await axios.get(url);
            console.log("Respuesta del servidor:", response.data);
            return response.data;
        } catch (error) {
            console.error('Detalles completos del error:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url
            });
            throw error;
        }
    },

    getBancasWithDetails() {
        return [
            {
                id: '3000',
                code: 'banca001',
                name: 'Banca Centro',
                location: 'Santo Domingo',
                employees: [
                    { name: 'Luis Martínez', role: 'Gerente', status: 'Activo' },
                    { name: 'Ana Pérez', role: 'Cajera', status: 'Activo' },
                    { name: 'Carlos Gómez', role: 'Vendedor', status: 'Activo' },
                    { name: 'María Sánchez', role: 'Vendedora', status: 'Inactivo' },
                    { name: 'Pedro Jiménez', role: 'Supervisor', status: 'Activo' }
                ],
                recentTransactions: [
                    { date: '2024-11-01', amount: 5000, type: 'Venta' },
                    { date: '2024-11-02', amount: 7000, type: 'Recaudación' },
                    { date: '2024-11-03', amount: 3000, type: 'Pago de Premio' }
                ]
            },
            {
                id: '3001',
                code: 'banca002',
                name: 'Banca del Este',
                location: 'La Romana',
                employees: [
                    { name: 'José Fernández', role: 'Gerente', status: 'Activo' },
                    { name: 'Paola Ruiz', role: 'Cajera', status: 'Activo' },
                    { name: 'Claudia López', role: 'Vendedora', status: 'Inactivo' }
                ],
                recentTransactions: [
                    { date: '2024-11-01', amount: 4000, type: 'Venta' },
                    { date: '2024-11-02', amount: 6000, type: 'Recaudación' },
                    { date: '2024-11-03', amount: 2000, type: 'Pago de Premio' }
                ]
            }
        ];
    },
    // El resto de tus métodos permanecen igual
};

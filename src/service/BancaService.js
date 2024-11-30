export const BancaService = {
    getBancasData() {
        return [
            {
                id: '3000',
                code: 'banca001',
                name: 'Banca Centro',
                location: 'Santo Domingo',
                status: 'ACTIVA',
                employees: 5,
                dailyRevenue: 15000,
                monthlyRevenue: 450000,
                ticketsSold: 1200,
                rating: 4.7
            },
            {
                id: '3001',
                code: 'banca002',
                name: 'Banca del Este',
                location: 'La Romana',
                status: 'ACTIVA',
                employees: 3,
                dailyRevenue: 10000,
                monthlyRevenue: 300000,
                ticketsSold: 900,
                rating: 4.5
            },
            {
                id: '3002',
                code: 'banca003',
                name: 'Banca Sur',
                location: 'San Cristóbal',
                status: 'INACTIVA',
                employees: 0,
                dailyRevenue: 0,
                monthlyRevenue: 0,
                ticketsSold: 0,
                rating: 3.8
            },
            {
                id: '3003',
                code: 'banca004',
                name: 'Banca Norte',
                location: 'Santiago',
                status: 'ACTIVA',
                employees: 4,
                dailyRevenue: 13000,
                monthlyRevenue: 390000,
                ticketsSold: 1100,
                rating: 4.6
            }
        ];
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

    getBancaById(id) {
        const banca = this.getBancasData().find(banca => banca.id === id);
        return banca
            ? Promise.resolve(banca)
            : Promise.reject(new Error(`No se encontró la banca con ID ${id}`));
    },

    getBancaByCode(code) {
        const banca = this.getBancasData().find(banca => banca.code === code);
        return banca
            ? Promise.resolve(banca)
            : Promise.reject(new Error(`No se encontró la banca con código ${code}`));
    },


    getLotteryResults() {
        return [
            {
                id: '1', image: 'lottery1.png',
                name: 'Lotería Nacional',
                drawTime: '10:00 AM',
                winningNumbers: [12, 34, 56, 78, 90]
            },
            {
                id: '2',
                image: 'lottery2.png',
                name: 'Lotería del Este',
                drawTime: '12:00 PM',
                winningNumbers: [22, 44, 66, 88, '00']
            },
            {
                id: '3',
                image: 'lottery3.png',
                name: 'Lotería del Sur',
                drawTime: '02:00 PM',
                winningNumbers: [11, 33, 55, 77, 99]
            }
        ];
    },


    getLotteryResultsWithDetails() {
        return Promise.resolve(this.getLotteryResults());
    },




    getBancasMini() {
        return Promise.resolve(this.getBancasData().slice(0, 2));
    },

    getBancas() {
        return Promise.resolve(this.getBancasData());
    },

    getBancasWithDetailsSmall() {
        return Promise.resolve(this.getBancasWithDetails().slice(0, 1));
    },

    getBancasWithDetails() {
        return Promise.resolve(this.getBancasWithDetails());
    }


};

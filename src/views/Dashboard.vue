<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ProductService } from '@/service/ProductService';
import InputText from 'primevue/inputtext';
import { computed, onMounted, ref, watch } from 'vue';
import apiClient from '@/api/axios';
import { getResults } from '@/service/LotteryService';
import WebSocketService from '@/service/WebSocketService';


// Importar valores de tema y colores
const { getPrimary, getSurface, isDarkTheme } = useLayout();

// Declaración de referencias reactivas
const products = ref(null);
const chartData = ref(null);
const chartData2 = ref(null);
const chartOptions = ref(null);
const chartOptions2 = ref(null);

const loading = ref(false);


const premiosHoy = ref(0);
const premiosReclamados = ref(0);
const premiosPendientes = ref(0);

const fetchPremiosHoy = async () => {
    try {
        const response = await apiClient.get('/premios-hoy');  // URL de la API
        premiosHoy.value = response.data.premiosHoy || 0;
        premiosReclamados.value = response.data.premiosReclamados || 0;
        premiosPendientes.value = response.data.premiosPendientes || 0;
    } catch (error) {
        console.error('Error al obtener los premios de hoy:', error);
    }
};

onMounted(() => {
    fetchPremiosHoy();
});




// Datos de Loterías
const premios = ref(0);
const venta = ref(0);
const comision = ref(0);
const utilidad = ref(0);

const fetchLoteriaData = async () => {

    try {
        const response = await apiClient.get('/loteria-data');  // URL de la API
        premios.value = response.data.premios || 0;
        venta.value = response.data.venta || 0;
        comision.value = response.data.comision || 0;
        utilidad.value = response.data.utilidad || 0;
    } catch (error) {
        console.error('Error al obtener los datos de lotería:', error);
    }
};

onMounted(() => {
    fetchLoteriaData();
});



const user = ref({
    first_name: '',
    last_name: '',
})


// Datos de loterías y opciones de menú

const lotteries = ref([]);
const fetchLotteries = async () => {
    try {
        const response = await apiClient.get('/lotteries/');
        const today = new Date().toISOString().split('T')[0]; // Fecha actual en formato "YYYY-MM-DD"

        lotteries.value = response.data;

        lotteries.value.sort((a, b) => {
            const dateA = new Date(a.date).toISOString().split('T')[0];
            const dateB = new Date(b.date).toISOString().split('T')[0];

            // Priorizar las fechas iguales a la actual
            if (dateA === today && dateB !== today) return -1;
            if (dateB === today && dateA !== today) return 1;

            // Ordenar por fecha más reciente primero
            return new Date(b.date) - new Date(a.date);
        });

        console.log(lotteries.value);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

onMounted(() => {
    fetchLotteries();
});

// const lotteries = ref([
//     { image: 'real.jpg', name: 'Loto Real', time: '18:00', winningNumbers: ['12 -34 - 56'] },
//     { image: 'nacional.png', name: 'Lotería Nacional', time: '20:00', winningNumbers: ['98 - 76 -54'] },
//     { image: 'loteria-florida-dia.png', name: 'Florida', time: '20:00', winningNumbers: ['09-87-65'] },
//     { image: 'leidsa.jpg', name: 'Leidsa', time: '20:00', winningNumbers: ['98-89-00'] },
//     { image: 'primera.jpg', name: 'Primera', time: '20:00', winningNumbers: ['98 - 76 - 54'] },
//     { image: 'newyork.png', name: 'New York', time: '20:00', winningNumbers: ['76 - 54 - 56'] },
//     { image: 'anguila.png', name: 'Anguila', time: '20:00', winningNumbers: ['54 - 46 - 79'] },
// ]);

const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' }
]);



const fetchUserData = async () => {
    try {
        const response = await apiClient.get('/profile/');
        if (response.status === 200) {
            const data = response.data;
            user.value.first_name = data.first_name || 'Usuario';
            user.value.last_name = data.last_name || 'Sin apellido';
        }
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
};

onMounted(() => {
    fetchUserData();
});

// Configuración de datos y opciones de gráficos
function getChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        labels: ['Loteca', 'Leidsa', 'Nacional', 'Real'],
        datasets: [
            { type: 'line', label: 'Ganancias', backgroundColor: documentStyle.getPropertyValue('--p-primary-400'), data: [4000, 10000, 15000, 4000], barThickness: 32 },
            { type: 'line', label: 'Perdidas', backgroundColor: documentStyle.getPropertyValue('--p-primary-300'), data: [2100, 8400, 2400, 7500], barThickness: 32 },
            { type: 'line', label: 'N/A', backgroundColor: documentStyle.getPropertyValue('--p-primary-200'), data: [4100, 5200, 3400, 7400], borderRadius: { topLeft: 8, topRight: 8 }, borderSkipped: true, barThickness: 32 }
        ]
    };
}

function getChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: { stacked: true, ticks: { color: documentStyle.getPropertyValue('--text-color-secondary') }, grid: { color: 'transparent', borderColor: 'transparent' } },
            y: { stacked: true, ticks: { color: documentStyle.getPropertyValue('--text-color-secondary') }, grid: { color: documentStyle.getPropertyValue('--surface-border'), borderColor: 'transparent', drawTicks: false } }
        }
    };
}

function getChartData2() {
    return {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            { label: 'Ingresos', backgroundColor: 'rgba(34, 197, 94, 0.7)', borderColor: 'rgba(34, 197, 94, 1)', data: [5000, 7000, 6000, 8000, 7500, 9000], borderRadius: 10, barThickness: 30 },
            { label: 'Egresos', backgroundColor: 'rgba(239, 68, 68, 0.7)', borderColor: 'rgba(239, 68, 68, 1)', data: [3000, 4000, 3200, 4500, 5000, 4700], borderRadius: 10, barThickness: 30 }
        ]
    };
}

function getChartOptions2() {
    const documentStyle = getComputedStyle(document.documentElement);
    return {
        maintainAspectRatio: false,
        scales: {
            x: { stacked: false, ticks: { color: documentStyle.getPropertyValue('--text-color-secondary') }, grid: { color: 'transparent', borderColor: 'transparent' } },
            y: { stacked: false, ticks: { color: documentStyle.getPropertyValue('--text-color-secondary'), callback: (value) => `$${value.toLocaleString()}` }, grid: { color: documentStyle.getPropertyValue('--surface-border'), borderColor: 'transparent', drawTicks: false } }
        },
        plugins: {
            legend: { labels: { color: documentStyle.getPropertyValue('--text-color-secondary') } },
            tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}` } }
        }
    };
}


onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data));
    chartData.value = getChartData();
    chartData2.value = getChartData2();
    chartOptions.value = getChartOptions();
    chartOptions2.value = getChartOptions2();
});

const mostrarDialog = ref(false);
const codigo = ref(null);
const error = ref(false);

const validarHexadecimal = () => {
    error.value = !/^[0-9A-Fa-f]+$/.test(codigo.value);
};

const procesarCodigo = () => {
    if (!error.value) {
        // Aquí procesarías el código hexadecimal ingresado
        console.log("Código hexadecimal válido:", codigo.value);
        mostrarDialog.value = false;
    }


    return {
        mostrarDialog,
        codigo,
        error,
        validarHexadecimal,
        procesarCodigo,
    };
};
watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = getChartData();
    chartOptions.value = getChartOptions();
});


const position = ref('center');
const visible = ref(false);

const openPosition = (pos) => {
    position.value = pos;
    visible.value = true;
}

const mayus = computed({
    get: () => codigo.value?.toUpperCase() ?? "",
    set: (valor) => codigo.value = valor
});


watch([getPrimary, getSurface, isDarkTheme], () => {
    chartData.value = getChartData();
    chartOptions.value = getChartOptions();
    chartData2.value = getChartData2();
    chartOptions2.value = getChartOptions2();
});

const dialogoTicketVisible = ref(false);

// Función para mostrar el ticket después de activar el preloader
const saveAndShowTicket = () => {
    loading.value = true; // Activar el preloader
    setTimeout(() => {
        loading.value = false; // Desactivar el preloader
        dialogoTicketVisible.value = true; // Mostrar el diálogo de ticket
    }, 1000); // Simular un tiempo de espera
};

// Datos de ejemplo para el ticket, deben ser reemplazados con datos reales
const detallesTicket = ref({
    apuestas: [
        { combinacion: '10-10', loteria: 'FL', horario: 'N', fecha: '19/May/20', monto: '20.00' },
        { combinacion: '10-11', loteria: 'FL', horario: 'N', fecha: '19/May/20', monto: '41.00' },
        { combinacion: '10-12', loteria: 'FL', horario: 'N', fecha: '19/May/20', monto: '41.00' },
        { combinacion: '10-14', loteria: 'FL', horario: 'N', fecha: '19/May/20', monto: '100.00' },
        { combinacion: '15-15-15', loteria: 'FL', horario: 'N', fecha: '19/May/20', monto: '2.00' },
    ],
    creadoPor: 'Juan Lopez',
    fechaImpresion: '2020-05-19 19:58:27',
    montoTotal: 204
});

// Configuración de WebSocket
onMounted(() => {
    WebSocketService.connect(); // Conectar al WebSocket

    // Esperar que el WebSocket se haya abierto antes de enviar un mensaje
    WebSocketService.addListener('open', () => {
        WebSocketService.sendMessage({ type: 'chat_message', message: 'Hola, ¿cómo estás?' });
    });
});

</script>


<template>


    <!-- Información del usuario -->
    <div class=" card flex justify-between items-center p-6 rounded-lg shadow-md mb-10">
        <div class="flex flex-col ">
            <h4 class="font-bold text-3xl  tracking-wide">{{ user.first_name }} {{ user.last_name }}</h4>
            <p class="text-sm  mt-1 italic">
                Última Actualización: <span class="font-semibold">2024 / 05 / 19 7:55:33 PM</span>
            </p>
        </div>
        <div class="flex space-x-2">
            <Button label="Enviar alerta" icon="pi pi-exclamation-triangle" class="p-button-warning" />
            <Button label="Ver Ticket" icon="pi pi-eye" class="p-button-info" @click="openPosition('top')" />
        </div>


    </div>

    <!-- Diálogo de código -->
    <Dialog v-model:visible="visible" header="Revisar Ticket" :style="{ width: '25rem' }" :position="position"
        :modal="true" :draggable="false">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Ingrese Codigo del Ticket.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="code" class="font-semibold w-24">Codigo</label>
            <InputText id="codigoHex" v-model="mayus" @input="validarHexadecimal" class="flex-auto" autocomplete="on" />
            <small v-if="error" class="p-error">Código inválido</small>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="saveAndShowTicket" :loading="loading"></Button>
        </div>
    </Dialog>

    <!-- Diálogo de Ticket -->
    <Dialog v-model:visible="dialogoTicketVisible" header="Detalles del Ticket" :style="{ width: '30rem' }" modal
        :draggable="false">
        <div>
            <!-- Contenido del ticket -->
            <div class="flex justify-between items-center mb-4">
                <h2 class="font-bold text-lg">Jugada EEJTEK</h2>
                <span class="bg-blue-500 text-white rounded-md px-2 py-1">Válida</span>
            </div>
            <!-- Tabla para mostrar los detalles del ticket -->
            <table class="w-full border-collapse">
                <thead>
                    <tr class="text-gray-600">
                        <th class="py-2 px-4 border-b">Combinación</th>
                        <th class="py-2 px-4 border-b">Lotería</th>
                        <th class="py-2 px-4 border-b">Horario</th>
                        <th class="py-2 px-4 border-b">Fecha</th>
                        <th class="py-2 px-4 border-b">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(apuesta, indice) in detallesTicket.apuestas" :key="indice">
                        <td class="py-2 px-4 border-b">{{ apuesta.combinacion }}</td>
                        <td class="py-2 px-4 border-b">{{ apuesta.loteria }}</td>
                        <td class="py-2 px-4 border-b">{{ apuesta.horario }}</td>
                        <td class="py-2 px-4 border-b">{{ apuesta.fecha }}</td>
                        <td class="py-2 px-4 border-b">{{ apuesta.monto }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-4">
                <p><strong>Creado por:</strong> {{ detallesTicket.creadoPor }}</p>
                <p><strong>Fecha impresión:</strong> {{ detallesTicket.fechaImpresion }}</p>
                <p><strong>Monto total:</strong> {{ detallesTicket.montoTotal }}</p>
            </div>
            <div class="flex justify-end gap-2 mt-6">
                <Button type="button" label="Cerrar" severity="secondary"
                    @click="dialogoTicketVisible = false"></Button>
                <Button type="button" label="Cancelar Jugada" class="p-button-danger"></Button>
            </div>
        </div>
    </Dialog>


    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20">
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 md:col-span-6 lg:col-span-4">
                <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Loterias</span>

                            <div class="flex gap-3 m-2">
                                <div class="text-center">
                                    <div class="text-xl font-semibold ">{{ premios }}</div>
                                    <p class="text-sm ">Premios</p>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-semibold ">{{ venta }}</div>
                                    <p class="text-sm ">Venta</p>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-semibold ">{{ comision }}</div>
                                    <p class="text-sm ">Comisión</p>
                                </div>
                                <div class="text-center">
                                    <div class="text-xl font-semibold ">{{ utilidad }}</div>
                                    <p class="text-sm ">Utilidad</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-center  rounded-border w-10 h-10">
                            <i class="pi pi-dollar text-blue-500 dark:text-blue-200 !text-xl" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">24 new </span>
                    <span class="text-surface-500 dark:text-surface-300">desde la última semana</span>
                </div>
            </div>
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Premios de
                                hoy</span>
                            <div class="flex justify-between mb-4">
                                <div>
                                    <div class="text-xl font-semibold ">{{ premiosHoy }}</div>
                                </div>
                            </div>

                            <div class="flex justify-between mb-2">
                                <div class="text-center">
                                    <span class="block  font-medium">Premios reclamados</span>
                                    <div class="text-xl font-semibold ">{{ premiosReclamados }}</div>
                                </div>
                                <div class="text-center">
                                    <span class="block  font-medium">Premios pendientes</span>
                                    <div class="text-xl font-semibold ">{{ premiosPendientes }}</div>
                                </div>
                            </div>
                            <hr class="mb-2 border-gray-200">
                        </div>
                        <div class="flex items-center justify-center  rounded-border w-10 h-10">
                            <i class="pi pi-gift text-orange-500 dark:text-orange-200 !text-xl" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">%52+ </span>
                    <span class="text-surface-500 dark:text-surface-300">Premios Total</span>
                </div>
            </div>


            <div class="col-span-12 md:col-span-6 lg:col-span-5">
                <div class="bg-surface-0 dark:bg-surface-900 shadow p-4 rounded-border">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span
                                class="block text-surface-500 dark:text-surface-300 font-medium mb-4">Resultados</span>
                        </div>
                        <div
                            class="w-10 h-10 flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/30 rounded-border">
                            <i class="pi pi-inbox text-cyan-500 dark:text-cyan-200 !text-xl" />
                        </div>
                    </div>
                    <DataTable :value="lotteries" :rows="5" :paginator="true" responsiveLayout="scroll"  :sortField="'date'" :sortOrder="-1">
                        <Column style="width: 20%" header="Lotería">
                            <template #body="slotProps">
                                <img :src="slotProps.data.image_url" alt="loteria" width="50"
                                    class="rounded-full shadow-md" />
                            </template>
                        </Column>
                        <Column field="name" header="Nombre" :sortable="true"></Column>
                        <Column field="date" header="Fecha" :sortable="true" dateFormat="dd/MM/yyyy HH:mm" :sortField="'date'" :sortOrder="-1">
                        </Column>                        
                        <Column field="number" header="Números Ganadores">
                            <template #body="slotProps">
                                <span class="text-green-600">
                                    {{ slotProps.data.number.split('_').join(', ') }}
                                </span>
                            </template>
                        </Column>
                    </DataTable>

                </div>
            </div>

        </div>
    </div>

    <!-- Gráfico de ventas y notificaciones -->
    <div class="grid grid-cols-1 gap-8 mt-10">
        <!--  Grafico  Ganancias de ultimo mes -->

        <div class="card p-6  rouded-lg shadow-md">
            <div class="bg-green-500 text-white font-semibold p-3 rounded-t-lg">
                Ganancias del ultimo mes
            </div>
            <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem] text-green-400" />

        </div>

        <!-- Gráfico de flujo de ingresos -->
        <div class="card p-6  rounded-lg shadow-md">
            <div class="bg-green-500 text-white font-semibold p-3 rounded-t-lg">Flujo de ingresos</div>
            <Chart type="bar" :data="chartData2" :options="chartOptions2" class="h-80" />
        </div>








        <div class="card shadow-lg rounded-lg">
            <!-- Encabezado de la tarjeta -->
            <div class="bg-green-500 text-white font-semibold p-3 rounded-t-lg">
                Terminales
            </div>

            <!-- Contenido de la tarjeta con datos de terminales en formato de tabla -->
            <div class="overflow-x-auto  p-4 rounded-b-lg">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-gray-300">
                            <th class="py-2 px-4 font-medium">Usuario</th>
                            <th class="py-2 px-4 font-medium">Total Loterías</th>
                            <th class="py-2 px-4 font-medium">Premios Pagos</th>
                            <th class="py-2 px-4 font-medium">Premios Pendientes</th>
                            <th class="py-2 px-4 font-medium">Mov. Efectivo</th>
                            <th class="py-2 px-4 font-medium">Comisión</th>
                            <th class="py-2 px-4 font-medium">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Aquí podrías agregar filas de datos dinámicamente usando un v-for -->
                        <tr>
                            <td colspan="7" class="py-4 px-4 text-end ">
                                Actualmente no hay información que mostrar
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

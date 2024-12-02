<template>
    <div class="p-4">
        <!-- Filtros -->
        <div class=" p-4 rounded-lg shadow mb-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block  font-medium mb-1">Fecha Inicial</label>
                    <DatePicker v-model="FechaInicial" showIcon fluid iconDisplay="input" inputId="icondisplay" placeholder="MM/DD/YYYY" />
                </div>
                <div>
                    <label class="block  font-medium mb-1">Fecha Final</label>
                    <DatePicker v-model="FechaFinal" showIcon fluid iconDisplay="input" inputId="icondisplay" placeholder="MM/DD/YYYY" />

                </div>
                <div>
                    <label class="block  font-medium mb-1">Jugada a mostrar</label>
                    <Select :options="playOptions" option-label="label" placeholder="Todos" class="w-full" 
                    v-model="selectedPlayOption"
                    />
                    
                </div>
            </div>
            <div class="mt-4 flex justify-end">
                <Button label="Search" icon="pi pi-search" iconPos="left" size="large" />
            </div>
        </div>

        <!-- Tabla de Reporte -->
        <div class=" p-4 rounded-lg shadow">
            <h2 class="text-lg font-semibold  mb-4">Reportes de premios</h2>
            <DataTable :value="reports" class="w-full">
                <Column field="banca" header="Banca" />
                <Column field="empleado" header="Emplead@" />
                <Column field="jugada" header="Jugada" />
                <Column field="tipo" header="Tipo" />
                <Column field="fechaJugada" header="Fecha Jugada" />
                <Column field="premiosEntregados" header="Premios Entregados" />
                <Column field="premiosPendientes" header="Premios Pendientes" />
                <Column field="totalPremios" header="Total de Premios" />
            </DataTable>
            <p v-if="reports.length === 0" class="text-center text-gray-500 mt-4">No hay resultados disponibles.</p>
        </div>
    </div>
</template>

<script setup>
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { ref } from 'vue';

const FechaInicial = ref();
const FechaFinal = ref();

const playOptions = ref([
    {label: 'Todos', value: 'todos' },
    {label: 'Entregados', value: 'entregados'},
    {label: 'Pendientes', value: 'pendientes'}
]);
const reports = ref([]);

const selectedPlayOption = ref(null);
</script>


<template>


    <div class="card">
        <div class="card p-6 rounded-lg shadow-md">
            <!-- Título de la sección -->
            <h2 class="text-2xl font-semibold  mb-6">Administrar Datos de la Banca</h2>
            <!-- Formulario -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <!-- Código banca -->
                <div>
                    <label class="block  font-medium mb-1">Código banca:</label>
                    <InputText v-model="bankCode" placeholder="816" class="w-full" />
                </div>
                <!-- Nombre ticket -->
                <div>
                    <label class="block  font-medium mb-1">Nombre ticket (Este se imprimirá en el Ticket de
                        Jugada):</label>
                    <InputText v-model="ticketName" placeholder="Banca Juan" class="w-full" />
                </div>

                <!-- Nombre clave -->
                <div>
                    <label class="block  font-medium mb-1">Nombre clave (Solo para identificar
                        internamente):</label>
                    <InputText v-model="internalName" placeholder="banca_1_1033" class="w-full" />
                </div>

                <!-- Teléfono -->
                <div>
                    <label class="block  font-medium mb-1">Teléfono:</label>
                    <InputText v-model="phone" placeholder="8095551234" class="w-full" />
                </div>

                <!-- Dirección -->
                <div class="col-span-2">
                    <label class="block  font-medium mb-1">Dirección:</label>
                    <InputText v-model="address" placeholder="123 Coconut Drive" class="w-full" />
                </div>

                <!-- Utilizar presupuesto propio -->
                <div>
                    <label class="block  font-medium mb-1">Utilizar presupuesto propio:</label>
                    <Select v-model="useOwnBudget" :options="budgetOptions" option-label="label" class="w-full" />
                </div>
            </div>

            <!-- Mensajes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label class="block font-medium mb-1">Mensaje creación jugada:</label>
                    <Textarea v-model="createMessage" rows="2" class="w-full"
                        placeholder="Ingrese el mensaje aquí..." />
                </div>
                <div>
                    <label class="block font-medium mb-1">Mensaje creación jugada deportiva:</label>
                    <Textarea v-model="createSportMessage" rows="2" class="w-full"
                        placeholder="Ingrese el mensaje aquí..." />
                </div>
                <div>
                    <label class="block font-medium mb-1">Mensaje cancelación jugada:</label>
                    <Textarea v-model="cancelMessage" rows="2" class="w-full"
                        placeholder="Ingrese el mensaje aquí..." />
                </div>
                <div>
                    <label class="block font-medium mb-1">Mensaje cancelación jugada deportiva:</label>
                    <Textarea v-model="cancelSportMessage" rows="2" class="w-full"
                        placeholder="Ingrese el mensaje aquí..." />
                </div>
                <div>
                    <label class="block font-medium mb-1">Mensaje jugada premiada:</label>
                    <Textarea v-model="winMessage" rows="2" class="w-full" placeholder="Ingrese el mensaje aquí..." />
                </div>
                <div>
                    <label class="block font-medium mb-1">Mensaje jugada deportiva premiada:</label>
                    <Textarea v-model="winSportMessage" rows="2" class="w-full"
                        placeholder="Ingrese el mensaje aquí..." />
                </div>
            </div>

            <!-- Tipo de Banca -->
            <div class="mb-6">
                <label class="block font-medium mb-1">Tipo de Banca:</label>
                <Select v-model="bankType" :options="bankTypeOptions" option-label="label" class="w-full" />
            </div>

            <!-- Botones de acción -->
            <div class="flex justify-end space-x-4">
                <Button label="Procesar Datos Banca" class="p-button-success" @click="processData" />
                <Button label="Desactivar Banca" class="p-button-danger" @click="deactivateBank" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { BancaService } from '@/service/BancaService';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';


import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const banca = ref(null);

const activeTab = ref(0); 

onMounted(async () => {
    console.log("ID de ruta recibido:", route.params.id);

    try {
                const bancaId = route.params.id;
                const bancaData = await BancaService.getBancaById(bancaId);
                console.log("Datos de banca obtenidos:", bancaData);
                banca.value = bancaData;
            } catch (error) {
                console.error("Error al obtener los detalles de la banca:", error);
            }
            return{ banca}

        activeTab.value = 0;
});



const bankCode = ref('');
const ticketName = ref('');
const internalName = ref('');
const phone = ref('');
const address = ref('');
const useOwnBudget = ref(null);
const createMessage = ref('');
const createSportMessage = ref('');
const cancelMessage = ref('');
const cancelSportMessage = ref('');
const winMessage = ref('');
const winSportMessage = ref('');
const bankType = ref(null);

const budgetOptions = [{ label: 'Sí', value: true }, { label: 'No', value: false }];
const bankTypeOptions = [{ label: 'Clásica', value: 'clasica' }, { label: 'Moderna', value: 'moderna' }];

const processData = () => {
    console.log('Procesando datos de la banca...');
    // Aquí podrías añadir la lógica para procesar los datos
};



const deactivateBank = () => {
    console.log('Desactivando banca...');
    // Aquí podrías añadir la lógica para desactivar la banca
};


</script>



<style scoped>
/* Agrega estilos adicionales aquí si es necesario */
</style>

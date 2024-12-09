
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
                    <InputText v-model="internalName" placeholder="" class="w-full" />
                </div>

                <!-- Teléfono -->
                <div>
                    <label class="block  font-medium mb-1">Teléfono:</label>
                    <InputText v-model="phone" placeholder="" class="w-full" />
                </div>

                <!-- Dirección -->
                <div class="col-span-2">
                    <label class="block  font-medium mb-1">Dirección:</label>
                    <InputText v-model="address" placeholder="" class="w-full" />
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
                <button 
                    @click="toggleBanca(banca.id)"
                    :class="{
                        'bg-green-500 hover:bg-green-700 text-white': banca && banca.status === 'ACTIVA',
                        'bg-red-500 hover:bg-red-700 text-white': banca && banca.status === 'INACTIVA'}"
                        class="px-4 py-2 rounded-lg">
                    {{ banca && banca.status === 'ACTIVA' ? 'Desactivar' : 'Activar' }} Banca
                </button>           
             </div>
        </div>
    </div>
</template>

<script setup>
import { BancaService } from '@/service/BancaService';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import { useToast } from 'primevue/usetoast';




import { onMounted, ref } from 'vue';
import { useRoute , useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter();
const banca = ref('INACTIVA');
const toast = useToast();
const activeTab = ref(0); 

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

onMounted(async () => {
    console.log("ID de ruta recibido:", route.params.id);

    try {
                const bancaId = route.params.id;
                const bancaData = await BancaService.getBancaById(bancaId);
                console.log("Datos de banca obtenidos:", bancaData);

        if (bancaData && bancaData.status) {
            banca.value = bancaData;
        } else {
            banca.value = { ...bancaData, status: 'INACTIVA' }; // Asigna un valor por defecto si no está presente
        }

                // Asignar datos obtenidos a las variables reactivas
                bankCode.value = bancaData.codigo; 
                ticketName.value = bancaData.nombre_ticket;
                internalName.value = bancaData.nombre; 
                phone.value = bancaData.telefono; 
                address.value = bancaData.direcccion; 
                useOwnBudget.value = bancaData.usar_presupuesto_propio; 
                createMessage.value = bancaData.mensaje_creacion_jugada; 
                createSportMessage.value = bancaData.mensaje_creacion_jugada_deportiva; 
                cancelMessage.value = bancaData.mensaje_cancelacion_jugada; 
                cancelSportMessage.value = bancaData.mensaje_cancelacion_jugada_deportiva; 
                winMessage.value = bancaData.mensaje_jugada_premiada; 
                winSportMessage.value = bancaData.mensaje_jugada_deportiva_premiada; 
                bankType.value = bancaData.tipo_de_bancas;


                banca.value = bancaData;
            } catch (error) {
                console.error("Error al obtener los detalles de la banca:", error);
            }
            return{ banca}

        activeTab.value = 0;
});
// Función para alternar el estado de la banca (activar/desactivar)
const toggleBanca = async (id) => {
    
    if (!banca.value) {
        console.error('No se ha cargado la banca correctamente.');
        return;
    }

    console.log('Alternando estado de la banca...');
    try {
        const response = await BancaService.toggleBanca(id); // Llamamos al servicio para alternar el estado

        // Actualizamos el estado reactivo en Vue
        if (response.status === 'ACTIVA') {
            banca.value.status = 'ACTIVA';
            toast.add({ severity: 'success', summary: 'Banca Activada', detail: 'La banca se ha activado correctamente', life: 5000 });
        } else {
            banca.value.status = 'INACTIVA';
            toast.add({ severity: 'warn', summary: 'Banca Desactivada', detail: 'La banca se ha desactivado correctamente', life: 5000 });
        }

 router.push({ name: 'listabancas' });    }
    
    
    catch (error) {
        console.error('Error al alternar el estado de la banca:', error);
        alert('Hubo un error al alternar el estado de la banca');
    }
};


const processData = async () => {
        
        console.log('Procesando datos de la banca...'); 
        const bancaId = route.params.id; 
        const bancaData = {
                codigo: bankCode.value, 
                nombre_ticket: ticketName.value, 
                nombre: internalName.value, 
                telefono: phone.value, 
                direcccion: address.value, 
                usar_presupuesto_propio: useOwnBudget.value.value, 
                mensaje_creacion_jugada: createMessage.value, 
                mensaje_creacion_jugada_deportiva: createSportMessage.value, 
                mensaje_cancelacion_jugada: cancelMessage.value, 
                mensaje_cancelacion_jugada_deportiva: cancelSportMessage.value, 
                mensaje_jugada_premiada: winMessage.value, 
                mensaje_jugada_deportiva_premiada: winSportMessage.value, 
                tipo_de_bancas: bankType.value.value 
                }; 

                console.log('Datos a enviar:', bancaData);
         
        try { 
            const response = await BancaService.updateBanca(bancaId, 
            bancaData); 
                    console.log('Datos de la banca actualizados:', 
                response); 
                
            } catch (error) 
                   
            { console.error('Error al actualizar los datos de la banca:', 
           
            error); } 
        }; 
       
       
const deactivateBanca = async () => { 
            console.log('Desactivando banca...');
            const bancaId = route.params.id;
            try { 
                const response = await BancaService.deactivateBanca(bancaId); 
                console.log('Banca desactivada:', response); 
                
                // Actualizar el valor reactivo correctamente
                if (response) {
                    // Actualizar los valores reactivos
                    useOwnBudget.value = false;  // Por ejemplo, deshabilitar presupuesto
                    
                    // Si el backend devuelve los datos actualizados
                    if (response.activa !== undefined) {
                        banca.value = { 
                            ...banca.value, 
                            activa: false,
                            status: 'INACTIVA'
                        };
                    }
            
            alert('Banca desactivada correctamente');
        }
    } catch (error) { 
        console.error('Error al desactivar la banca:', error); 
        alert('Hubo un error al desactivar la banca'); 
    } 
};

</script>





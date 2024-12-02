<template>
  <div class="p-4">

      <TabView>

          <TabPanel header="Datos">
              <!-- Formulario de Datos del Empleado -->
              <div class="grid grid-cols-2 gap-4 p-6 rounded-lg shadow-md">
                  <div>
                      <label class="block ">Nombres</label>
                      <InputText v-model="employee.firstName" placeholder="Tu  nombre" class="w-full" />
                  </div>
                  <div>
                      <label class="block ">Apellidos</label>
                      <InputText v-model="employee.lastName" placeholder=" Tu apellido" class="w-full" />
                  </div>

                  <div>
                      <label class="block ">Usuario</label>
                      <InputText v-model="employee.username" placeholder="Nombre de Usuario" class="w-full" />
                  </div>
                  <div>
                      <label class="block ">Clave</label>
                      <InputText v-model="employee.password" type="password" placeholder="Password" class="w-full" />
                  </div>

                  <div>
                      <label class="block ">Hora Entrada</label>
                      <DatePicker v-model="employee.startTime" timeOnly hourFormat="12" placeholder=" 09:00 AM" class="w-full" />
                  </div>
                  <div>
                      <label class="block ">Hora Salida</label>
                      <DatePicker v-model="employee.endTime" timeOnly hourFormat="12" placeholder="10:00 PM" class="w-full" />
                  </div>

                  <div>
                      <label class="block ">Máximo de ventas antes de bloqueo de ventas</label>
                      <InputText v-model="employee.maxSales" placeholder="10000" class="w-full" />
                  </div>
                  <div>
                      <label class="block ">Código dispositivo</label>
                      <InputText v-model="employee.deviceCode" placeholder="Código dispositivo" class="w-full" />
                  </div>

                  <div>
                      <label class="block ">Tamaño tickets</label>
                      <Select v-model="employee.ticketSize" :options="ticketSizes" optionLabel="label" class="w-full" />
                  </div>
                  <div>
                      <label class="block ">Zona horaria</label>
                      <Select v-model="employee.timeZone" :options="timeZones" optionLabel="label" class="w-full" />
                  </div>
              </div>

              <!-- Botones de Acción -->
              <div class="mt-4 flex space-x-2">
                  <Button label="Procesar Empleado" icon="pi pi-check" class="p-button-success" @click="processEmployee" />
                  <Button label="Desvincular dispositivo" icon="pi pi-unlink" class="p-button-warning" @click="unlinkDevice" />
                  <Button label="Deshabilitar empleado" icon="pi pi-user-times" class="p-button-warning" @click="disableEmployee" />
                  <Button label="Bloquear ventas" icon="pi pi-ban" class="p-button-danger" @click="blockSales" />
              </div>
          </TabPanel>

          <!-- Otra Pestaña (Ejemplo de Configuración) -->
          <TabPanel header="Com. Lot">
                <div class=" p-6 rounded-lg shadow-md">
                    <h2 class="text-xl font-semibold  mb-4">Comisiones de Loterías</h2>

                    <!-- Tabla de Comisiones -->
                    <div class="space-y-4">
                        <!-- Encabezados de la Tabla -->
                        <div class="flex items-center space-x-4">
                            <span class="w-1/4 font-bold text-lg text-green-500">Juego</span>
                            <span class="w-1/4 font-bold text-lg text-green-500">Porcentaje</span>

                        </div>

                        <!-- Filas de Comisiones -->
                        <div v-for="game in lotteryCommissions" :key="game.name" class="flex items-center space-x-4">
                            <!-- Nombre del Juego -->

                            <span class="w-1/4 ">{{ game.name }}</span>

                            <!-- Input para el Porcentaje -->
                            <InputText v-model="game.percentage" placeholder="0" class="w-1/4" />

                            <!-- Botón Actualizar -->
                            <Button label="Actualizar" icon="pi pi-refresh" class="p-button-primary" @click="updateCommission(game)" />
                        </div>
                    </div>
                </div>
            </TabPanel>
      </TabView>
  </div>
</template>

<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';



import { ref } from 'vue';

const employee = ref({
  firstName: '',
  lastName: '',
  username: '',
  password: '',
  startTime: '',
  endTime: '',
  maxSales: 10000,
  deviceCode: '',
  ticketSize: '',
  timeZone: '',
});


// Datos de comisiones de loterías
const lotteryCommissions = ref([
    { name: 'Pale', percentage: 0 },
    { name: 'Number', percentage: 0 },
    { name: 'Win 4', percentage: 0 },
    { name: 'Quiniela', percentage: 0 },
    { name: 'Tripleta', percentage: 0 },
    { name: 'Super Pale', percentage: 0 },
    { name: 'Marriage', percentage: 0 },
    { name: 'Bolettie', percentage: 0 },
    { name: 'Lotería 3', percentage: 0 },
    { name: 'Lotería 4', percentage: 0 },
]);

// Función para actualizar la comisión
const updateCommission = (game) => {
    console.log(`Actualizando comisión para ${game.name} con ${game.percentage}%`);
    // Aquí puedes agregar la lógica para guardar o enviar el valor actualizado
};

const ticketSizes = [
  { label: 'Normal', value: 'normal' },
  { label: 'Grande', value: 'large' },
];

const timeZones = [
  { label: 'America/Santo_Domingo', value: 'America/Santo_Domingo' },
  { label: 'America/New_York', value: 'America/New_York' },
];

const processEmployee = () => {
  console.log("Procesando empleado", employee.value);
};

const unlinkDevice = () => {
  console.log("Desvinculando dispositivo");
};

const disableEmployee = () => {
  console.log("Deshabilitando empleado");
};

const blockSales = () => {
  console.log("Bloqueando ventas");
};
</script>

<style scoped>
/* Personalización adicional */
</style>

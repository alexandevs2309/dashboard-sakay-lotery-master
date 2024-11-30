<script setup>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';

import { useToast } from 'primevue/usetoast';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const employees = ref([]);

// Cargar datos desde localStorage en el montaje
    onMounted(() => {
      const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
      employees.value = storedEmployees;
    });

// Guardar en localStorage cuando `employees` cambia
watch(employees, (newEmployees) => {
  localStorage.setItem('employees', JSON.stringify(newEmployees));
}, { deep: true });

const searchQuery = ref('');
const addEmployeeDialog = ref(false);
const showDisabledEmployees = ref(false);

// Nuevo empleado
const newEmployee = ref({
  name: '',
  surname: '',
  startTime: '',
  startPeriod: '', // Valor inicial para el Dropdown de AM/PM
  endTime: '',
  endPeriod: '',   // Valor inicial para el Dropdown de AM/PM
  deviceCode: generateDeviceCode()
});

const timePeriods = [
  [  'AM'] ,
  [ 'PM'] ,
  
];

// Generar código de dispositivo único
function generateDeviceCode() {
  return 'BCA-' + Math.floor(Math.random() * 10000);
}

// Funciones para cada botón
const addEmployee = () => {
  addEmployeeDialog.value = true;
  newEmployee.value.deviceCode = generateDeviceCode(); // Nuevo código para cada empleado
};

const showDisabled = () => {
  showDisabledEmployees.value = true;
  toast.add({ severity: 'info', summary: 'Empleados deshabilitados', detail: 'Mostrando empleados deshabilitados.', life: 3000 });
};

const updatePlan = () => {
  toast.add({ severity: 'info', summary: 'Actualizar Plan', detail: 'Función de actualización de plan en desarrollo.', life: 3000 });
};

// Formatear hora en formato HH:MM AM/PM
// Formatear hora en formato HH:MM AM/PM
const formatTime = (time, period) => {
  if (!time) return ''; // Manejo de caso si no hay tiempo

  const date = new Date(time);
  const hours = date.getHours() % 12 || 12; // Conversión a formato de 12 horas
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Asegura que siempre sean dos dígitos
  return `${hours}:${minutes} ${period}`; // Combina hora y período correctamente
return ''; // Retorna una cadena vacía si el tiempo es inválido
};




// Guardar nuevo empleado
const saveEmployee = () => {
  if (!newEmployee.value.name || !newEmployee.value.surname || !newEmployee.value.startTime || !newEmployee.value.endTime) {
    toast.add({ severity: 'warn', summary: 'Error', detail: 'Completa todos los campos.', life: 3000 });
    return;
  }

  const employeeToSave = {
    id: employees.value.length ? employees.value[employees.value.length - 1].id + 1 : 1,
    name: newEmployee.value.name,
    surname: newEmployee.value.surname,
    startTime: formatTime(newEmployee.value.startTime, newEmployee.value.startPeriod),
    endTime: formatTime(newEmployee.value.endTime, newEmployee.value.endPeriod),
    deviceCode: newEmployee.value.deviceCode
  };

  employees.value.push(employeeToSave);
  toast.add({ severity: 'success', summary: 'Empleado agregado', detail: 'Nuevo empleado agregado correctamente.', life: 3000 });

  // Reiniciar formulario
  addEmployeeDialog.value = false;
  newEmployee.value = { name: '', surname: '', startTime: '', startPeriod: 'AM', endTime: '', endPeriod: 'AM', deviceCode: generateDeviceCode() };
};




// Redirigir a administrarempleado.vue
const goToEmployeeAdmin = (employeeId) => {
  router.push({ name: 'AdministrarEmpleados', params: { id: employeeId } });
};
</script>

<template>
  <div class="p-4">
    <div class="p-3 bg-blue-100 text-blue-700 rounded-lg mb-6 flex justify-between">
      <span>Para poder agregar más usuarios debe actualizar su plan.</span>
      <Button label="Actualizar Plan" icon="pi pi-refresh" class="p-button-primary ml-2" @click="updatePlan" />
    </div>

    <div class="flex justify-end mb-4 space-x-2">
      <Button label="Agregar Empleado" icon="pi pi-user-plus" class="p-button-success" @click="addEmployee" />
      <Button label="Mostrar deshabilitados" icon="pi pi-eye-slash" class="p-button-danger" @click="showDisabled" />
    </div>

    <div class="p-3 bg-green-100 text-green-700 rounded-lg mb-4">
      Total de empleados: {{ employees.length }}
    </div>

    <DataTable :value="employees" class="shadow-lg" :paginator="true" :rows="10" :globalFilter="searchQuery" responsiveLayout="scroll">
  <template #header>
    <div class="flex justify-between items-center">
      <span class="text-lg font-bold">Listado de Empleados</span>
      <InputText v-model="searchQuery" placeholder="Buscar..." class="p-inputtext-sm" />
    </div>
  </template>
  
  <Column field="id" header="ID" />
  <Column field="name" header="Nombre">
    <template #body="slotProps">
      <a href="#" class="text-blue-600 hover:underline" @click.prevent="goToEmployeeAdmin(slotProps.data.id)">
        {{ slotProps.data.name }}
      </a>
    </template>
  </Column>
  <Column field="surname" header="Apellido" />
  
  <!-- Concatenamos `startTime` con `startPeriod` -->
  <Column header="Hora Entrada">
    <template #body="slotProps">
      {{ slotProps.data.startTime }} {{ slotProps.data.startPeriod }}
    </template>
  </Column>
  
  <!-- Concatenamos `endTime` con `endPeriod` -->
  <Column header="Hora Salida">
    <template #body="slotProps">
      {{ slotProps.data.endTime }} {{ slotProps.data.endPeriod }}
    </template>
  </Column>
  
  <Column field="deviceCode" header="Código Dispositivo" />
</DataTable>


<Dialog header="Agregar Nuevo Empleado" v-model:visible="addEmployeeDialog" modal class="w-1/3">
  <div class="flex flex-col space-y-4">
    <InputText v-model="newEmployee.name" placeholder="Nombre" class="w-full" />
    <InputText v-model="newEmployee.surname" placeholder="Apellido" class="w-full" />

    <!-- Campo de Hora de Entrada con AM/PM -->
    <div class="flex space-x-2">
      <DatePicker v-model="newEmployee.startTime" timeOnly hourFormat="12" placeholder="Hora Entrada" class="w-full" />
      <Select v-model="newEmployee.startPeriod" :options="timePeriods" placeholder="AM/PM" class="w-1/3" />
    </div>

    <!-- Campo de Hora de Salida con AM/PM -->
    <div class="flex space-x-2">
      <DatePicker v-model="newEmployee.endTime" timeOnly hourFormat="12" placeholder="Hora Salida" class="w-full" />
      <Select v-model="newEmployee.endPeriod" :options="timePeriods" placeholder="AM/PM" class="w-1/3" />
    </div>
    
    <InputText v-model="newEmployee.deviceCode" placeholder="Código Dispositivo" class="w-full" :disabled="true" />
  </div>

  <p class="text-yellow-600 text-center m-2 border-l border-lime-100">
    (NOTA!) Una vez termine de crear el empleado vaya a configuración de empleados para agregar funciones faltantes.
  </p>

  <template #footer>
    <Button label="Guardar" icon="pi pi-check" class="p-button-success" @click="saveEmployee" />
    <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="addEmployeeDialog = false" />
  </template>
</Dialog>


    <Dialog header="Empleados Deshabilitados" v-model:visible="showDisabledEmployees" modal class="w-1/3">
      <p>Esta funcionalidad está en desarrollo. Aquí se mostrarán los empleados deshabilitados.</p>
      <Button label="Cerrar" class="p-button-secondary mt-4" @click="showDisabledEmployees = false" />
    </Dialog>
  </div>
</template>

<style scoped>
/* Estilos personalizados si los necesitas */
</style>

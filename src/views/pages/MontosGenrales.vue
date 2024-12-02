<template>
    <div class="p-6">
      <!-- Title -->
      <h2 class="text-blue-600 text-xl font-semibold mb-2">Montos Generales</h2>
  
      <!-- Info Message -->
      <p class="bg-yellow-100 text-yellow-800 p-2 rounded mb-4">
        Al actualizar estos montos se actualizarán todos los de la lotería de esta banca por igual
      </p>
  
      <!-- Dropdown for Presupuesto -->
      <div class="flex items-center mb-4">
        <label for="presupuesto" class="mr-2">Presupuesto:</label>
        <Select :options="presupuestoOptions" v-model="selectedPresupuesto" placeholder="Seleccionar" option-label="label" class="w-full md:w-1/2" />
      </div>
  
      <!-- Game and Capital Table -->
      <div class="overflow-x-auto">
        <table class="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="p-2 text-left">Juego</th>
              <th class="p-2 text-left">Capital</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in games" :key="game.name" class="border-b border-gray-300">
              <td class="p-2 font-medium">{{ game.name }}</td>
              <td class="p-2">
                <InputText v-model="game.capital" class="w-full" placeholder="Monto para todas las loterías en {{ game.name }}" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Update Button -->
      <div class="flex justify-center mt-4">
        <Button label="Actualizar todos los presupuestos" class="p-button p-button-primary" @click="updateBudgets" />
      </div>
    </div>
  </template>
  
<script>
  
  import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { ref } from 'vue';

  export default {
    components: {
      Select,
      InputText,
      Button,
    },
    setup() {
      const presupuestoOptions = [
        { label: 'Presupuesto 1', value: 'presupuesto1' },
        { label: 'Presupuesto 2', value: 'presupuesto2' },
        // Agrega más opciones según sea necesario
      ];
      const selectedPresupuesto = ref(null);
  
      const games = ref([
        { name: 'Quiniela', capital: '' },
        { name: 'Pale', capital: '' },
        { name: 'Super Pale', capital: '' },
        { name: 'Tripleta', capital: '' },
        { name: 'Number', capital: '' },
        { name: 'Vim 4', capital: '' },
        { name: 'Lotería 3', capital: '' },
        { name: 'Botelete', capital: '' },
        { name: 'Lotería 4', capital: '' },
        { name: 'Marriage', capital: '' },
      ]);
  
      const updateBudgets = () => {
        console.log("Actualizando todos los presupuestos");
        // Lógica para actualizar presupuestos
      };
  
      return {
        presupuestoOptions,
        selectedPresupuesto,
        games,
        updateBudgets,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Personalización de estilos adicionales */
  </style>
  
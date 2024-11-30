<template>
    <div class="p-2">
    
      <!-- Header -->
      <h2 class="text-lg font-semibold mb-4">Administrar Módulos de la Banca</h2>
  
      <!-- Modules Table -->
      <div class="overflow-x-auto">
        <table class="w-full ">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left">Nombre</th>
              <th class="p-2 text-left">Estado</th>
              <th class="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="module in modules" :key="module.name" class="border-b">
              <td class="p-2">{{ module.name }}</td>
              <td class="p-2">{{ module.status ? 'Activo' : 'Desactivado' }}</td>
              <td class="p-2">
                <Button v-if="module.status" label="Desactivar" icon="pi pi-times"  class="p-button p-button-danger mr-2" @click="toggleModule(module)" />
                <Button v-else icon="pi pi-check" label="Activar" class="p-button p-button-primary" @click="toggleModule(module)" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Button from 'primevue/button';
import { ref } from 'vue';
  
  export default {
    components: {
      Button,
    },
    setup() {
      const modules = ref([
        { name: 'Lotería', status: true },
        { name: 'Recargas', status: false },
        { name: 'Consultar Jugadas', status: true },
        { name: 'Ligar Pares', status: true },
        { name: 'Marcar automáticamente como entregados', status: false },
        { name: 'Decimales en loterías', status: false },
        // Agrega más módulos según sea necesario
      ]);
  
      const toggleModule = (module) => {
        module.status = !module.status;
        console.log(`${module.status ? 'Activado' : 'Desactivado'} módulo: ${module.name}`);
      };
  
      return {
        modules,
        toggleModule,
      };
    },
  };
  </script>
  
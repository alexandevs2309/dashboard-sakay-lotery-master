<template>
    <div class="p-4">
      <h2 class="text-lg font-bold mb-4">Reportes Generales</h2>
  
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 bg-blue-100 text-blue-800 rounded-lg shadow">
          <h3 class="font-bold mb-2">Reporte de Ventas</h3>
          <Button label="Generar Reporte" icon="pi pi-chart-bar" class="p-button-info w-full" @click="generateSalesReport" />
        </div>
        <div class="p-4 bg-green-100 text-green-800 rounded-lg shadow">
          <h3 class="font-bold mb-2">Reporte de Ganancias</h3>
          <Button label="Generar Reporte" icon="pi pi-chart-line" class="p-button-success w-full" @click="generateProfitReport" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Button from 'primevue/button';
  
  const generateSalesReport = () => {
    console.log('Generando reporte de ventas...');
  };
  
  const generateProfitReport = () => {
    console.log('Generando reporte de ganancias...');
  };
  </script>
  
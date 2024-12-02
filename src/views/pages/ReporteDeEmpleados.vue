<template>
  <div class="p-6">
    <!-- Header -->
    <h2 class="text-lg font-semibold mb-4">Reporte de ventas de los empleados</h2>

    <!-- Filtro de Fechas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Fecha Inicial -->
      <div class="col-span-1">
        <label for="startDate" class="text-sm font-medium">Fecha Inicial</label>
        <DatePicker
          id="startDate"
          v-model="startDate"
          dateFormat="dd/mm/yy"
          placeholder="DD/MM/YYYY"
          class="w-full"
        />
      </div>

      <!-- Fecha Final -->
      <div class="col-span-1">
        <label for="endDate" class="text-sm font-medium">Fecha Final</label>
        <DatePicker
          id="endDate"
          v-model="endDate"
          dateFormat="dd/mm/yy"
          placeholder="DD/MM/YYYY"
          class="w-full"
        />
      </div>

      <!-- Botón Filtrar -->
      <div class="col-span-1 flex items-end">
        <Button
          label="Filtrar"
          icon="pi pi-search"
          class="p-button p-button-primary w-full"
          @click="filterReport"
        />
      </div>
    </div>

    <!-- Reporte de Ventas -->
    <div class=" card p-4 rounded-lg shadow-md">
      <!-- Título del reporte -->
      <h3 class="text-md font-semibold mb-2">
        Reportes de ventas de los empleados del <span class="text-blue-500 font-bold text-lg mx-1">{{ formattedStartDate }} </span> al <span class="text-blue-500 font-bold text-lg mx-1">{{ formattedEndtDate }} </span>
      </h3>

      <!-- Tabla de Reporte -->
      <table class="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr class=" text-left">
            <!-- Encabezados Generales -->
            <th class="p-2" colspan="2">Generales</th>
            <!-- Encabezados Operaciones -->
            <th class="p-2" colspan="3">Operaciones</th>
            <!-- Encabezados Premios -->
            <th class="p-2" colspan="3">Premios</th>
            <!-- Encabezado Saldos -->
            <th class="p-2">Saldos</th>
          </tr>
          <tr class=" text-left">
            <th class="p-2">Banca</th>
            <th class="p-2">Nombre</th>
            <th class="p-2">Promedio Ventas Lot.</th>
            <th class="p-2">Ingresos Loterías</th>
            <th class="p-2">Total de Comisiones</th>
            <th class="p-2">Entregados</th>
            <th class="p-2">Sacados</th>
            <th class="p-2">Pendientes</th>
            <th class="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <!-- Filas de datos, con ejemplos para ilustrar -->
          <tr v-for="(item, index) in reportData" :key="index" class="border-b">
            <td class="p-2">{{ item.banca }}</td>
            <td class="p-2">{{ item.nombre }}</td>
            <td class="p-2">{{ item.promedioVentasLot }}</td>
            <td class="p-2">{{ item.ingresosLoterias }}</td>
            <td class="p-2">{{ item.totalComisiones }}</td>
            <td class="p-2">{{ item.entregados }}</td>
            <td class="p-2">{{ item.sacados }}</td>
            <td class="p-2">{{ item.pendientes }}</td>
            <td class="p-2">{{ item.total }}</td>
          </tr>
          <!-- Fila para Total General -->
          <tr class="font-semibold ">
            <td colspan="2" class="p-2">Total General</td>
            <td class="p-2">{{ total.promedioVentasLot }}</td>
            <td class="p-2">{{ total.ingresosLoterias }}</td>
            <td class="p-2">{{ total.totalComisiones }}</td>
            <td class="p-2">{{ total.entregados }}</td>
            <td class="p-2">{{ total.sacados }}</td>
            <td class="p-2">{{ total.pendientes }}</td>
            <td class="p-2">{{ total.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import { computed, ref } from 'vue';

export default {
  components: {
    DatePicker,
    Button,
  },
  setup() {
    // Filtros de fecha
    const startDate = ref(null);
    const endDate = ref(null);

    const formattedStartDate = computed(() => 
      startDate.value ?  new Date(startDate.value).toLocaleDateString(): ""

  );

    const formattedEndtDate = computed(() => 
      endDate.value ? new Date(endDate.value).toLocaleDateString(): ""
  );

    // Datos de ejemplo para el reporte
    const reportData = ref([
      {
        banca: 'Banca Juan',
        nombre: 'Juan Lopez',
        promedioVentasLot: '$1,430',
        ingresosLoterias: '$1,430',
        totalComisiones: '$143',
        entregados: '$0',
        sacados: '$0',
        pendientes: '$0',
        total: '$1,287',
      },
      {
        banca: 'Banca Juan',
        nombre: 'Juan Lopez',
        promedioVentasLot: '$0',
        ingresosLoterias: '$0',
        totalComisiones: '$0',
        entregados: '$0',
        sacados: '$0',
        pendientes: '$0',
        total: '$0',
      },
    ]);

    // Totales
    const total = ref({
      promedioVentasLot: '$1,430',
      ingresosLoterias: '$1,430',
      totalComisiones: '$143',
      entregados: '$0',
      sacados: '$0',
      pendientes: '$0',
      total: '$1,287',
    });

    // Función para filtrar el reporte (lógica a implementar)
    const filterReport = () => {
      console.log("Filtrar reporte de", startDate.value, "a", endDate.value);
      // Aquí se puede implementar la lógica para actualizar `reportData` y `total`
    };

    return {
      startDate,
      endDate,
      formattedStartDate,
      formattedEndtDate,
      reportData,
      total,
      filterReport,
    };
  },
};
</script>

<style scoped>
/* Estilos personalizados adicionales */
</style>

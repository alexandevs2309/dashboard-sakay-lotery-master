






<template>
  <div class="p-6 bg-gray-100 min-h-screen">


    <h1 class="text-xl font-bold mb-4">Listado de Resultados de los Sorteos</h1>
    <Divider/>
    <DataTable
      v-if="sorteos.length > 0"
      :value="sorteos"
      paginator
      :rows="10"
      :filters="filters"
      :globalFilterFields="['fecha', 'loteria']"
      responsiveLayout="scroll"
      class="shadow-lg rounded-lg"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="">
     
    >
      <template #header>
        <div class="flex justify-between items-center">

          <InputText
            v-model="filters.global.value"
            placeholder="Buscar..."
            class="p-inputtext-sm p-inputtext-rounded"
            
          />
        </div>
      </template>

      <Column field="fecha" header="Fecha" sortable />
      <Column field="loteria" header="Lotería" sortable />
      <Column field="horario" header="Horario" sortable />
      <Column field="primero" header="Primero" sortable />
      <Column field="segundo" header="Segundo" sortable />
      <Column field="tercero" header="Tercero" sortable />
      <Column field="procesado" header="Procesado" sortable />
    </DataTable>
  </div>
</template>

<script>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { ref } from "vue";

export default {
  components: { DataTable, Column, InputText },
  setup() {
    const sorteos = ref([]);

    const generarDatosFicticios = () => {
      const loterias = ["La Primera", "New York", "Real", "Florida", "Nacional"];
      const horarios = ["T", "N"];
      for (let i = 0; i < 50; i++) {
        sorteos.value.push({
          fecha: new Date(2024, 10, Math.ceil(Math.random() * 30))
            .toISOString()
            .split("T")[0],
          loteria: loterias[Math.floor(Math.random() * loterias.length)],
          horario: horarios[Math.floor(Math.random() * horarios.length)],
          primero: Math.random() > 0.5 ? Math.ceil(Math.random() * 100) : -1,
          segundo: Math.random() > 0.5 ? Math.ceil(Math.random() * 100) : -1,
          tercero: Math.random() > 0.5 ? Math.ceil(Math.random() * 100) : -1,
          procesado: Math.random() > 0.5 ? 1 : 0,
        });
      }
    };

    generarDatosFicticios();

    const filters = ref({
      global: { value: null, matchMode: "contains" },
    });

    return { sorteos, filters };
  },
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>

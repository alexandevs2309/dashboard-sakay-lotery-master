

<script>
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import { onMounted, ref } from "vue";
import apiClient from "@/api/axios";

export default {
  components: { DataTable, Column, InputText },
  setup() {
    const sorteos = ref([]);
    const filters = ref({
      global: { value: null, matchMode: "contains" },
    });

    const fetchSorteos = async () => {
     try {
      
      const response  = await apiClient.get('/resultados/');
      console.log(response)
      console.log(typeof response)
      console.log(response.data)
      sorteos.value = response.data;
      
      console.log(response.status)

     } catch (error) {
       console.error(error,'error al obtener los sorteos');
      
     }
    };

    onMounted(() => {
      fetchSorteos();
    });


    return { sorteos, filters };
  },
};
</script>







<template>
  <div class="p-6  min-h-screen">


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
     
    
      <template #header>
        <div class="flex justify-between items-center">

          <InputText
            v-model="filters.global.value"
            placeholder="Buscar..."
            class="p-inputtext-sm p-inputtext-rounded"
            
          />
        </div>
      </template>

      <Column field="date" header="Fecha" sortable />
      <Column field="name" header="Lotería" sortable />
      <Column field="horario_abreviatura" header="Horario" sortable />
      <Column field="primero" header="Primero" sortable />
      <Column field="segundo" header="Segundo" sortable />
      <Column field="tercero" header="Tercero" sortable />
      <Column field="procesado" header="Procesado" sortable />
    </DataTable>
  </div>
</template>
<style scoped>

</style>

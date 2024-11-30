<template>
  <div class="card">
    <Tabs value="0">
      <TabList>
        <Tab value="0">Datos</Tab>
        <Tab value="1">Montos </Tab>
        <Tab value="2">Presup </Tab>
        <Tab value="3">Premios </Tab>
        <Tab value="4">Minimo </Tab>
      </TabList>

      <!--  panel de datos -->
      <TabPanels>
        <TabPanel value="0">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">Administrar Datos de la Banca</h2>

          <div class="m-0">

            <div class="p-6 bg-gray-100 min-h-screen">
              <h1 class="text-xl font-bold mb-6">Administrar Datos del Consorcio</h1>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nombre del consorcio -->
                <div>
                  <label class="block text-sm font-medium mb-2">Nombre del consorcio</label>
                  <InputText v-model="consorcio.nombre" placeholder="Ejemplo: SUN" class="w-full p-inputtext-sm" />
                </div>

                <!-- Próximo pago -->
                <div>
                  <label class="block text-sm font-medium mb-2">Próximo pago</label>
                  <Calendar v-model="consorcio.proximoPago" :showIcon="true" class="w-full p-inputtext-sm" />
                </div>

                <!-- Tamaño de tickets -->
                <div>
                  <label class="block text-sm font-medium mb-2">Tamaño de tickets</label>
                  <Select v-model="consorcio.tamanoTickets" :options="tamanoTickets" optionLabel="label"
                    class="w-full p-inputtext-sm" />
                </div>

                <!-- Zona horaria -->
                <div>
                  <label class="block text-sm font-medium mb-2">Zona horaria</label>
                  <Select v-model="consorcio.zonaHoraria" :options="zonasHorarias" optionLabel="label"
                    class="w-full p-inputtext-sm" />
                </div>

                <!-- Máximo de usuarios activos -->
                <div>
                  <label class="block text-sm font-medium mb-2">Máximo de usuarios activos</label>
                  <InputNumber v-model="consorcio.usuariosActivos" :min="1" class="w-full p-inputtext-sm" />
                </div>
              </div>

              <!-- Botón para procesar -->
              <div class="mt-6">
                <Button label="Procesar Datos Consorcio" icon="pi pi-check" class="p-button-success w-full md:w-auto"
                  @click="procesarConsorcio" />
              </div>
            </div>

          </div>
        </TabPanel>


        <!-- Panel de Montos -->
        <TabPanel value="1">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">Montos Generales</h2>

          <!-- Mensaje de advertencia -->
          <div class="p-4 bg-yellow-100 text-yellow-800 rounded-md shadow-sm mb-6">
            Al actualizar estos montos se actualizarán todos los datos de este consorcio por igual.
          </div>

          <!-- Formulario de Montos -->
          <div class="overflow-x-auto shadow-md rounded-lg">
            <form @submit.prevent="guardarCambios">
              <table class="table-auto w-full bg-white border border-gray-200 rounded-lg">
                <thead class="bg-gray-100 text-gray-600 text-left">
                  <tr>
                    <th class="px-4 py-2">Juego</th>
                    <th class="px-4 py-2">Capital</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(monto, index) in montos" :key="index" class="border-t">
                    <td class="px-4 py-2 text-gray-700 font-medium">{{ monto.juego }}</td>
                    <td class="px-4 py-2">
                      <!-- Campo editable con placeholder -->
                      <InputText v-model="monto.capital"
                        :placeholder="`Monto para todas las loterías en ${monto.juego}`" class="w-full" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- Botón para guardar -->
              <div class="flex justify-end mt-6">
                <Button label="Actualizar todos los presupuestos" icon="pi pi-refresh" class="p-button-primary"
                  type="submit" />
              </div>
            </form>
          </div>
        </TabPanel>

        <!-- Panel de Presupuestos -->
        <TabPanel value="2">
          <h2 class="text-2xl font-semibold text-gray-700 mb-6">Administrar Presupuestos</h2>

          <TabView>
            <!-- Pestañas por lotería -->
            <TabPanel v-for="(loteria, index) in loterias" :key="index" :header="loteria">
              <!-- Tabla de presupuestos -->
              <div class="overflow-x-auto shadow-md rounded-lg">
                <form @submit.prevent="guardarPresupuestos">
                  <table class="table-auto w-full bg-white border border-gray-200 rounded-lg">
                    <thead class="bg-gray-100 text-gray-600 text-left">
                      <tr>
                        <th class="px-4 py-2">Juego</th>
                        <th class="px-4 py-2">Horario</th>
                        <th class="px-4 py-2">Capital</th>
                        <th class="px-4 py-2">Día Válido</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(presupuesto, index) in presupuestos" :key="index" class="border-t">
                        <td class="px-4 py-2 text-gray-700 font-medium">
                          {{ presupuesto.juego }}
                        </td>
                        <td class="px-4 py-2">
                          <!-- Campo para el horario -->
                          <InputText v-model="presupuesto.horario" placeholder="Ej: 13:00:00" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                          <!-- Campo para el capital -->
                          <InputNumber v-model="presupuesto.capital" :placeholder="'Capital en ' + presupuesto.juego"
                            :min="0" class="w-full" />
                        </td>
                        <td class="px-4 py-2">
                          <!-- Campo para el día válido -->
                          <InputText v-model="presupuesto.diaValido" placeholder="Ej: Todos" class="w-full" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Botón para guardar -->
                  <div class="flex justify-end mt-4">
                    <Button label="Actualizar" icon="pi pi-refresh" class="p-button-primary" type="submit" />
                  </div>
                </form>
              </div>
            </TabPanel>
          </TabView>
        </TabPanel>

  <TabPanel value="3">
          <div class="card">
            <h2 class="text-2xl font-semibold text-gray-700 mb-6">Administrar Premios</h2>
            <TabView>
              <!-- Crear pestañas dinámicamente para las loterías -->
              <TabPanel v-for="(loteria, index) in loterias" :key="index" :header="loteria">
                <!-- Tabla de premios -->
                <div class="overflow-x-auto shadow-md rounded-lg">
                  <form @submit.prevent="actualizarPremios">
                    <table class="table-auto w-full bg-white border border-gray-200 rounded-lg">
                      <thead class="bg-gray-100 text-gray-600 text-left">
                        <tr>
                          <th class="px-4 py-2">Lotería</th>
                          <th class="px-4 py-2">Juego</th>
                          <th class="px-4 py-2">Resultado</th>
                          <th class="px-4 py-2">Monto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(premio, i) in premios" :key="i" class="border-t">
                          <td class="px-4 py-2">{{ loteria }}</td>
                          <td class="px-4 py-2">{{ premio.juego }}</td>
                          <td class="px-4 py-2">{{ premio.resultado }}</td>
                          <td class="px-4 py-2">
                            <InputNumber v-model="premio.monto" :placeholder="'Monto para ' + premio.juego" :min="0"
                              class="w-full" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!-- Botón para actualizar -->
                    <div class="flex justify-end mt-4">
                      <Button label="Actualizar" icon="pi pi-refresh" class="p-button-primary" type="submit" />
                    </div>
                  </form>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </TabPanel>

   <TabPanel value="4">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">Administrar Mínimos de Apuestas</h2>

        <!-- Tabla para mínimos -->
        <div class="overflow-x-auto shadow-md rounded-lg">
        <div>
    <DataTable :value="minimos" selectionMode="single" @row-select="onRowSelect">
      <Column field="juego" header="Juego" />
      <Column field="minimo" header="Mínimo" />
    </DataTable>

    <div v-if="selectedMinimo" class="mt-4">
      <h3>Editar Mínimo</h3>
      <div class="p-fluid">
        <div class="field">
          <label for="juego">Juego</label>
          <InputText v-model="selectedMinimo.juego" id="juego" />
        </div>
        <div class="field">
          <label for="minimo">Mínimo</label>
          <InputText v-model="selectedMinimo.minimo" id="minimo" />
        </div>
      </div>
      <Button label="Guardar" icon="pi pi-check" class="mt-2" @click="guardarEdicion" />
    </div>
  </div>
        </div>
</TabPanel>


        

      


      </TabPanels>
    </Tabs>
  </div>
</template>

<script>
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";


import Select from "primevue/select";
import { ref } from "vue";

export default {
  components: { InputText, DatePicker, Select, InputNumber, Button , DataTable, Column},
  setup() {
    const consorcio = ref({
      nombre: "",
      proximoPago: null,
      tamanoTickets: null,
      zonaHoraria: null,
      usuariosActivos: 1,
    });


    // Datos iniciales
    const montos = ref([
      { juego: "Quiniela", capital: "" },
      { juego: "Pale", capital: "" },
      { juego: "Super Pale", capital: "" },
      { juego: "Tripleta", capital: "" },
      { juego: "Number", capital: "" },
      { juego: "Win 4", capital: "" },
      { juego: "Lotería 3", capital: "" },
      { juego: "Borlette", capital: "" },
    ]);

    // Método para guardar cambios
    const guardarCambios = () => {
      console.log("Montos guardados:", montos.value);
    };

    // Datos iniciales
    const loterias = ref([
      "Real",
      "New York",
      "Nacional",
      "Loteka",
      "Leidsa",
      "La Primera",
      "Florida",
    ]);

    const presupuestos = ref([
      { juego: "Pale", horario: "13:00:00", capital: 0, diaValido: "Todos" },
      { juego: "Quiniela", horario: "13:00:00", capital: 0, diaValido: "Todos" },
      {
        juego: "Super Pale",
        horario: "13:00:00",
        capital: 0,
        diaValido: "Todos",
      },
      {
        juego: "Tripleta",
        horario: "13:00:00",
        capital: 0,
        diaValido: "Todos",
      },
    ]);

    // Función para guardar presupuestos
    const guardarPresupuestos = () => {
      console.log("Presupuestos actualizados:", presupuestos.value);
    };


    const premios = ref([
      { juego: "Pale", resultado: 12, monto: 0 },
      { juego: "Pale", resultado: 13, monto: 0 },
      { juego: "Quiniela", resultado: 1, monto: 0 },
      { juego: "Tripleta", resultado: 2, monto: 0 },
    ]);

    const actualizarPremios = () => {
      console.log("Premios actualizados:", premios.value);
    };

    const tamanoTickets = ref([
      { label: "Normal", value: "normal" },
      { label: "Grande", value: "grande" },
    ]);

    const zonasHorarias = ref([
      { label: "America/Santo_Domingo", value: "America/Santo_Domingo" },
      { label: "America/New_York", value: "America/New_York" },
    ]);




    const procesarConsorcio = () => {
      console.log("Datos del consorcio procesados:", consorcio.value);
    };



     // Datos iniciales de los mínimos
     const minimos = ref([
      { juego: "Quiniela", minimo: 50 },
      { juego: "Pale", minimo: 100 },
      { juego: "Super Pale", minimo: 200 },
    ]);
    const selectedMinimo = ref(null);

    const onRowSelect = (event) => {
      selectedMinimo.value = event.data;
    };

    const guardarEdicion = () => {
      selectedMinimo.value = null; // Limpia la selección
    };




    return {
      consorcio,
      tamanoTickets,
      zonasHorarias,
      procesarConsorcio,
      loterias, premios,
      actualizarPremios,
      montos,
      loterias,
      presupuestos,
      guardarPresupuestos,
      guardarCambios,
      minimos, selectedMinimo, onRowSelect, guardarEdicion
    };
  },
};
</script>

<template>
  <div class="p-6">
    <!-- Header -->
    <h2 class="text-lg font-semibold mb-4">Análisis de riesgo</h2>

    <!-- Filter Section -->
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <!-- Fecha Inicial -->
      <div class="col-span-1">
        <label for="startDate" class="text-sm font-medium">Fecha Inicial</label>
        <DatePicker
          id="startDate"
          v-model="startDate"
          dateFormat="mm/dd/yy"
          placeholder="Fecha Inicial"
          class="w-full"
        />
      </div>

      <!-- Fecha Final -->
      <div class="col-span-1">
        <label for="endDate" class="text-sm font-medium">Fecha Final</label>
        <DatePicker
          id="endDate"
          v-model="endDate"
          dateFormat="mm/dd/yy"
          placeholder="Fecha Final"
          class="w-full"
        />
      </div>


    

      <!-- Lotería -->
      <div class="col-span-1">
        <label for="lottery" class="text-sm font-medium">Lotería</label>
        <Select
          id="lottery"
          v-model="selectedLottery"
          :options="lotteries"
          optionLabel="name"
          placeholder="Seleccionar Lote"
          class="w-full"
        />
      </div>

      <!-- Horario -->
      <div class="col-span-1">
  <label for="time" class="text-sm font-medium">Horario</label>
  <DatePicker
    id="time"
    v-model="time"
    timeOnly
    hourFormat="12"
    placeholder="Seleccionar hora"
    class="w-full"
  />
</div>


      <!-- Botón Filtrar -->
      <div class="col-span-1 flex items-end">
        <Button
          label="Filtrar"
          icon="pi pi-search"
          class="p-button p-button-primary w-full"
          @click="filterResults"
        />
      </div>
    </div>

    <!-- Results Section -->
    <div class="space-y-6">
      <!-- Tabla para cada categoría -->
      <div v-for="category in categories" :key="category.name" class="border-t pt-4">
        <!-- Nombre de la categoría -->
        <h3 class="text-md font-semibold mb-2">{{ category.name }}</h3>
        
        <!-- Tabla de resultados -->
        <table class="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr class="">
              <th class="p-2 text-left">Jugada</th>
              <th class="p-2 text-left">Lotería</th>
              <th class="p-2 text-left">Monto</th>
              <th class="p-2 text-left">Horario</th>
              <th class="p-2 text-left">Premio</th>
              <th class="p-2 text-left">Tiempo al cierre</th>
            </tr>
          </thead>
          <tbody>
            <!-- Mostrar mensaje si no hay jugadas en la categoría -->
            <tr v-if="category.items.length === 0">
              <td class="p-2 text-center text-gray-500" colspan="6">No hay jugadas realizadas hasta el momento.</td>
            </tr>
            <!-- Fila para cada jugada en la categoría -->
            <tr
              v-for="item in category.items"
              :key="item.id"
              class="border-b"
            >
              <td class="p-2">{{ item.play }}</td>
              <td class="p-2">{{ item.lottery }}</td>
              <td class="p-2">{{ item.amount }}</td>
              <td class="p-2">{{ item.time }}</td>
              <td class="p-2">{{ item.prize }}</td>
              <td class="p-2">{{ item.timeToClose }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { ref } from 'vue';

export default {
  components: {
    DatePicker,
    Select,
    Button,
    InputText,
  },
  setup() {
    // Campos de filtro
    const startDate = ref(null); // Fecha inicial seleccionada por el usuario
    const endDate = ref(null);   // Fecha final seleccionada por el usuario
    const selectedLottery = ref(null); // Lotería seleccionada
    const time = ref(''); // Horario ingresado

    // Opciones para el dropdown de loterías (cambiar valores según los datos reales)
    const lotteries = ref([
      { name: 'Lotería 1', code: 'L1' },
      { name: 'Lotería 2', code: 'L2' },
      // Agrega más loterías según sea necesario
    ]);

    // Datos de ejemplo para cada categoría de resultados
    const categories = ref([
      {
        name: 'Quinielas',
        items: [
          { id: 1, play: '123', lottery: 'Lotería 1', amount: '100', time: '10:00 AM', prize: '500', timeToClose: '2 mins' },
          // Agregar más datos dinámicos aquí o dejarlos vacíos
        ],
      },
      {
        name: 'Pales',
        items: [],
      },
      {
        name: 'Super_pales',
        items: [],
      },
      {
        name: 'Tripletas',
        items: [],
      },
    ]);

    // Función para filtrar resultados, puede ser adaptada para una lógica real
    const filterResults = () => {
      console.log("Filtrando resultados", { startDate, endDate, selectedLottery, time });
      // Aquí se puede implementar la lógica para actualizar los resultados dinámicos
    };

    return {
      startDate,
      endDate,
      selectedLottery,
      time,
      lotteries,
      categories,
      filterResults,
    };
  },
};
</script>

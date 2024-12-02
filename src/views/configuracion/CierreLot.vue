<template>
  <div class="p-4  card pt-5 m-5">
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
    <div class="mt-4">
      <input 
        type="text" 
        placeholder="Minutos antes de cierre para todas las loterías" 
        class="border p-2 w-full mb-4"
        v-model.number="globalMinutos"
        @input="updateMinutos"
      />
      <table class="min-w-full ">
        <thead>
          <tr>
            <th class="py-2">Lotería</th>
            <th class="py-2">Sorteo</th>
            <th class="py-2">Cierre</th>
            <th class="py-2">Minutos a cerrar antes del sorteo</th>
            <th class="py-2">Días</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in loterias" :key="index">
            <td class="border px-4 py-2">{{ item.loteria }}</td>
            <td class="border px-4 py-2">{{ item.sorteo }}</td>
            <td class="border px-4 py-2">{{ item.cierre }}</td>
            <td class="border px-4 py-2">
              <input type="number" v-model.number="item.minutos" class="border p-2 w-full" />
            </td>
            <td class="border px-4 py-2">{{ item.dias }}</td>
          </tr>
        </tbody>     

             


      </table>
      <div class="flex justify-end mt-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded">Actualizar</button>
      </div> 
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const globalMinutos = ref(0);
    const loterias = ref([
      { loteria: 'Florida N', sorteo: '21:45:00', cierre: '21:40:00', minutos: 5, dias: 'Lunes/Sábado' },
      { loteria: 'Florida N', sorteo: '21:45:00', cierre: '21:40:00', minutos: 5, dias: 'Domingo' },
      { loteria: 'Florida N SP', sorteo: '21:45:00', cierre: '21:40:00', minutos: 5, dias: 'Lunes/Sábado' },
      { loteria: 'Florida N SP', sorteo: '21:45:00', cierre: '21:40:00', minutos: 5, dias: 'Domingo' },
      { loteria: 'Florida T', sorteo: '13:45:00', cierre: '13:40:00', minutos: 5, dias: 'Lunes/Sábado' },
      { loteria: 'Florida T', sorteo: '13:45:00', cierre: '13:40:00', minutos: 5, dias: 'Domingo' },
      { loteria: 'Florida T SP', sorteo: '13:45:00', cierre: '13:40:00', minutos: 5, dias: 'Domingo' },
      { loteria: 'La Primera T', sorteo: '12:00:00', cierre: '11:55:00', minutos: 5, dias: 'Lunes/Sábado' },
      { loteria: 'La Primera T', sorteo: '12:00:00', cierre: '11:55:00', minutos: 5, dias: 'Domingo' },
      { loteria: 'La Primera T SP', sorteo: '12:00:00', cierre: '11:55:00', minutos: 5, dias: 'Domingo' },
    ]);

    const updateMinutos = () => {
      loterias.value.forEach(item => {
        item.minutos = globalMinutos.value;
      });
    };

    return {
      globalMinutos,
      loterias,
      updateMinutos
    };
  }
};
</script>

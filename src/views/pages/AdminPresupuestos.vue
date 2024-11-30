<template>
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Administrar Presupuestos</h2>
  
      <div class="flex space-x-4 border-b mb-4">
        <button v-for="tab in tabs" :key="tab" class="p-2 hover:text-green-600">{{ tab }}</button>
      </div>
  
      <div class="overflow-x-auto">
        <table class="min-w-full border">
          <thead>
            <tr class="bg-gray-100 text-gray-700 text-sm uppercase">
              <th class="p-3 border">Juego</th>
              <th class="p-3 border">Horario</th>
              <th class="p-3 border">Capital</th>
              <th class="p-3 border">Día Válido</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in presupuestoData" :key="row.juego" class="border-b">
              <td class="p-3">{{ row.juego }}</td>
              <td class="p-3">{{ row.horario }}</td>
              <td class="p-3">
                <input type="text" class="w-full border p-2" :value="row.capital" />
              </td>
              <td class="p-3">{{ row.diaValido }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Actualizar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tabs: ["Real", "New York", "Nacional", "Loto", "Leidsa", "La Primera", "Florida"],
        presupuestoData: [
          { juego: "Pale", horario: "01:00:00 PM", capital: "100000", diaValido: "Todos" },
          { juego: "Quiniela", horario: "01:00:00 PM", capital: "100000", diaValido: "Todos" },
          { juego: "Super Pale", horario: "01:00:00 PM", capital: "100000", diaValido: "Todos" },
          { juego: "Tripleta", horario: "01:00:00 PM", capital: "100000", diaValido: "Todos" }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Agregar estilos adicionales si es necesario */
  </style>
  
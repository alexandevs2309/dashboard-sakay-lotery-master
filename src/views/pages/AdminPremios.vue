<template>
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Administrar Premios</h2>
  
      <div class="flex space-x-4 border-b mb-4">
        <button v-for="tab in tabs" :key="tab" class="p-2 hover:text-green-600">{{ tab }}</button>
      </div>
  
      <div class="overflow-x-auto">
        <table class="min-w-full ">
          <thead>
            <tr class="text-sm uppercase bg-gray-100 text-gray-700">
              <th class="p-3 border">Juego</th>
              <th class="p-3 border">Resultado</th>
              <th class="p-3 border">Monto</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in premiosData" :key="row.juego + row.resultado" class="border-b">
              <td class="p-3">{{ row.juego }}</td>
              <td class="p-3">{{ row.resultado }}</td>
              <td class="p-3">
                <input type="text" class="w-full border p-2" :value="row.monto" />
              </td>
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
        premiosData: [
          { juego: "Pale", resultado: "12", monto: "1300" },
          { juego: "Pale", resultado: "13", monto: "1200" },
          { juego: "Quiniela", resultado: "1", monto: "100" },
          { juego: "Tripleta", resultado: "1", monto: "20000" },
          // Agrega más datos según sea necesario
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* Agregar estilos adicionales si es necesario */
  </style>
  
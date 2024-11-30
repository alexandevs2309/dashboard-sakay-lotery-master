<template>
<div class="card p-4 sm:p-6">
  <Tabs v-model="activeTab" class="w-full">
          <TabList class="flex flex-wrap">
              <Tab value="0" class="p-2 sm:px-4">Quiniela</Tab>
              <Tab value="1" class="p-2 sm:px-4">Pale</Tab>
              <Tab value="2" class="p-2 sm:px-4">Super Pale</Tab>
              <Tab value="3" class="p-2 sm:px-4">Tripleta</Tab>
          </TabList>
          <TabPanels>
              <!-- Quiniela -->
              <TabPanel value="0">
                  <div class="card m-0">
                      <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                          <h2 class="text-2xl font-bold mb-4">Restringir Quiniela</h2>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="col-span-1 ml-10">
                                  <label for="quiniela" class="block font-medium mb-2">Número</label>
                                  <InputNumber v-model="quiniela" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1 ml-2">
                                  <label for="monto" class="block font-medium mb-2">Monto</label>
                                  <InputNumber v-model="monto" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1 ml-10">
                                  <label for="dias" class="block font-medium mb-2">Día</label>
                                  <Select v-model="selectionarDia" :options="diaDelaSemana" optionLabel="name" placeholder="Seleccionar Día" class="w-full md:w-56" />
                              </div>
                              <div class="col-span-1 flex items-end justify-end">
                                  <Button label="Agregar Restricción" @click="addRestriction('quiniela')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" />
                              </div>
                          </div>
                          <DataTable :value="restricciones" class="mt-6">
                              <Column field="numero" header="Número" />
                              <Column field="monto" header="Monto" />
                              <Column field="dia" header="Día" />
                              <Column header="Acciones">
                                  <template #body="slotProps">
                                      <Button icon="pi pitrash" label="Remover Restricción" @click="removeRestriction(slotProps.rowIndex)" class="p-button-danger" />
                                  </template>
                              </Column>
                          </DataTable>
                      </div>
                  </div>
              </TabPanel>

              <!-- Pale -->
              <TabPanel value="1">
                <div class="card p-4 sm:p-6">
                  <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                          <h2 class="text-2xl font-bold mb-4">Restringir Pale</h2>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="col-span-1 ml-2">
                                  <label for="pale" class="block font-medium mb-2">Primer Número</label>
                                  <InputNumber v-model="pale[0]" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1 ml-2">
                                  <label for="pale" class="block font-medium mb-2">Segundo Número</label>
                                  <InputNumber v-model="pale[1]" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1 ml-2">
                                  <label for="monto" class="block font-medium mb-2">Monto</label>
                                  <InputNumber v-model="monto" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1 ml-2">
                                  <label for="dias" class="block font-medium mb-2">Día</label>
                                  <Select v-model="selectionarDia" :options="diaDelaSemana" optionLabel="name" placeholder="Seleccionar Día" class="w-full md:w-56" />
                              </div>
                              <div class="col-span-1 flex items-end justify-end">
                                  <Button label="Agregar Restricción" @click="addRestriction('pale')" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md" />
                              </div>
                          </div>
                          <DataTable :value="restricciones" class="mt-6">
                              <Column field="numeros" header="Números" />
                              <Column field="monto" header="Monto" />
                              <Column field="dia" header="Día" />
                              <Column header="Acciones">
                                  <template #body="slotProps">
                                    <Button icon="pi pitrash" label="Remover Restricción" @click="removeRestriction(slotProps.rowIndex)" class="p-button-danger" />
                                  </template>
                              </Column>
                          </DataTable>
                      </div>
                  </div>
              </TabPanel>

              <!-- Super Pale -->
              <TabPanel value="2">
                <div class="card p-4 sm:p-6">
                  <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                          <h2 class="text-2xl font-bold mb-4">Restringir Super Pale</h2>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="col-span-1">
                                  <label for="superpale" class="block font-medium mb-2">Primer Número</label>
                                  <InputText v-model="superPale[0]" class="w-full sm:w-24" />
                              </div>
                              <div class="col-span-1">
                                  <label for="superpale" class="block font-medium mb-2">Segundo Número</label>
                                  <InputText v-model="superPale[1]" class="w-24" />
                              </div>
                              <div class="col-span-1">
                                  <label for="monto" class="block font-medium mb-2">Monto</label>
                                  <InputText v-model="monto" class="w-full" />
                              </div>
                              <div class="col-span-1">
                                  <label for="dias" class="block font-medium mb-2">Día</label>
                                  <Select v-model="selectionarDia" :options="diaDelaSemana" optionLabel="name" placeholder="Seleccionar Día" class="w-full md:w-56" />
                              </div>
                              <div class="col-span-1 flex items-end justify-end">
                                <Button label="Agregar Restricción" @click="addRestriction" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto" />
                              </div>
                          </div>
                          <DataTable :value="restricciones" class="mt-6">
                              <Column field="numeros" header="Números" />
                              <Column field="monto" header="Monto" />
                              <Column field="dia" header="Día" />
                              <Column header="Acciones">
                                  <template #body="slotProps">
                                      <Button icon="pi pitrash" label="Remover Restricción" @click="removeRestriction(slotProps.rowIndex)" class="p-button-danger" />
                                  </template>
                              </Column>
                          </DataTable>
                      </div>
                  </div>
              </TabPanel>

              <!-- Tripleta -->
              <TabPanel value="3">
                <div class="card p-4 sm:p-6">
                  <div class="bg-gray-100 p-6 rounded-lg shadow-md">
                          <h2 class="text-2xl font-bold mb-4">Restringir Tripleta</h2>
                          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <div class="col-span-1">
                                  <label for="tripleta" class="block font-medium mb-2">Primer Número</label>
                                  <InputText v-model="tripleta[0]" class="w-24" />
                              </div>
                              <div class="col-span-1">
                                  <label for="tripleta" class="block font-medium mb-2">Segundo Número</label>
                                  <InputText v-model="tripleta[1]" class="w-24" />
                              </div>
                              <div class="col-span-1">
                                  <label for="tripleta" class="block font-medium mb-2">Tercer Número</label>
                                  <InputText v-model="tripleta[2]" class="w-24" />
                              </div>
                              <div class="col-span-1 ">
                                  <label for="monto" class="block font-medium mb-2">Monto</label>
                                  <InputText v-model="monto" class="w-full" />
                              </div>
                              <div class="col-span-1 ">
                                  <label for="dias" class="block font-medium mb-2">Día</label>
                                  <Select v-model="selectionarDia" :options="diaDelaSemana" optionLabel="name" placeholder="Seleccionar Día" class="w-full md:w-56" />
                              </div>
                              <div class="col-span-1 flex items-end justify-end">
                                <Button label="Agregar Restricción" @click="addRestriction" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full sm:w-auto" />
                              </div>
                          </div>
                          <DataTable :value="restricciones" class="mt-6">
                              <Column field="numeros" header="Números" />
                              <Column field="monto" header="Monto" />
                              <Column field="dia" header="Día" />
                              <Column header="Acciones">
                                  <template #body="slotProps">
                                      <Button icon="pi pitrash" label="Remover Restricción" @click="removeRestriction(slotProps.rowIndex)" class="p-button-danger" />
                                  </template>
                              </Column>
                          </DataTable>
                      </div>
                  </div>
              </TabPanel>
          </TabPanels>
      </Tabs>
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'LotteryRestrictions',
  components: {
      InputText,
      Select,
      Button
  },
  setup() {
      const activeTab = ref("0");
      
      const quiniela = ref("");
      const pale = ref(["", ""]);
      const superPale = ref(["", ""]);
      const tripleta = ref(["", "", ""]);

      const monto = ref("");
      const selectionarDia = ref(null);
      const restricciones = ref([]);

      const diaDelaSemana = [
          { name: 'Domingo', code: 'DM' },
          { name: 'Lunes', code: 'LN' },
          { name: 'Martes', code: 'MRT' },
          { name: 'Miércoles', code: 'MLE' },
          { name: 'Jueves', code: 'JV' },
          { name: 'Viernes', code: 'VR' },
          { name: 'Sábado', code: 'SBd' }
      ];

      const addRestriction = (type) => {
          let nuevaRestriccion = {};

          if (type === 'quiniela') {
              nuevaRestriccion = {
                  numero: quiniela.value,
                  monto: monto.value,
                  dia: selectionarDia.value ? selectionarDia.value.name : 'No seleccionado'
              };
          } else if (type === 'pale') {
              nuevaRestriccion = {
                  numeros: pale.value,
                  monto: monto.value,
                  dia: selectionarDia.value ? selectionarDia.value.name : 'No seleccionado'
              };
          } else if (type === 'superPale') {
              nuevaRestriccion = {
                  numeros: superPale.value,
                  monto: monto.value,
                  dia: selectionarDia.value ? selectionarDia.value.name : 'No seleccionado'
              };
          } else if (type === 'tripleta') {
              nuevaRestriccion = {
                  numeros: tripleta.value,
                  monto: monto.value,
                  dia: selectionarDia.value ? selectionarDia.value.name : 'No seleccionado'
              };
          }

          restricciones.value.push(nuevaRestriccion);

          // Reset form fields
          quiniela.value = '';
          pale.value = ['', ''];
          superPale.value = ['', ''];
          tripleta.value = ['', '', ''];
          monto.value = '';
          selectionarDia.value = null;
      };

      const removeRestriction = (index) => {
          restricciones.value.splice(index, 1);
      };

      return {
          activeTab,
          quiniela,
          pale,
          superPale,
          tripleta,
          monto,
          selectionarDia,
          diaDelaSemana,
          restricciones,
          addRestriction,
          removeRestriction
      };
  }
});
</script>

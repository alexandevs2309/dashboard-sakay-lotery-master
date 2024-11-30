<template>
<div class="p-4 flex flex-wrap items-center justify-between my-8">
  <!-- Primer elemento -->
  <div class="flex items-center">
    <Message severity="success" variant="simple">
      Equipo de 4 Usuarios (plan limitado)
    </Message>
  </div>

  <!-- Segundo elemento -->
  <div class="flex items-center">
    <Button type="button" label="Actualizar Plan" icon="pi pi-sync" badge="2" badgeSeverity="contrast" variant="outlined" />
  </div>
</div>



  <div class="p-4 bg-white shadow rounded-lg">
    <h2 class="text-2xl font-semibold mb-4">Historial de Facturas</h2>
    <div class="flex flex-wrap justify-end gap-4 my-6">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText v-model="value1" placeholder="Buscar" />
      </IconField>
    </div>
    <table class="min-w-full bg-white border">
      <thead>
        <tr class="border-b">
          <th class="py-2 px-4 text-left">Código</th>
          <th class="py-2 px-4 text-left">Fecha</th>
          <th class="py-2 px-4 text-left">Monto</th>
          <th class="py-2 px-4 text-left">Descripción</th>
          <th class="py-2 px-4 text-left">Estado</th>
          <th class="py-2 px-4 text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factura, index) in facturas" :key="index" class="border-b">
          <td class="py-2 px-4">{{ factura.codigo }}</td>
          <td class="py-2 px-4">{{ factura.fecha }}</td>
          <td class="py-2 px-4">{{ factura.monto }}</td>
          <td class="py-2 px-4">{{ factura.descripcion }}</td>
          <td class="py-2 px-4">{{ factura.estado }}</td>
          <td class="py-2 px-4 flex items-center">
            <Button type="button" label="Pagar" icon="pi pi-paypal" :loading="loading" @click="load" /> 

            <Divider layout="vertical" class="!hidden md:!flex"><b>O</b></Divider>

            <a href="https://stripe.com/es" target="blanck">
            <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 512 214" class="ml-4"><path fill="#635bff" d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"/></svg>
          </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <span>Mostrando desde el 1 al 1 de 1 registros</span>
      <div class="flex gap-2">
        <div class="card">
          <Paginator :rows="10" :totalRecords="120" :rowsPerPageOptions="[5, 10, 20,]"></Paginator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref } from 'vue';

export default {
  setup() {
    const loading = ref(false);

    const load = () => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    };

    const facturas = ref([
      {
        codigo: '1015',
        fecha: '2020-05-19',
        monto: 50,
        descripcion: 'Renovación para 2 usuarios desde el 2020-05-19 al 2020-06-19',
        estado: 'Pendiente'
      }
    ]);

    return {
      loading,
      load,
      facturas
    };
  }
};
</script>

<template>
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-bold">Facturación</h2>
        <Button label="Generar Factura" icon="pi pi-file" class="p-button-primary" @click="showInvoiceDialog = true" />
      </div>
  
      <DataTable :value="invoices" class="shadow-lg" :paginator="true" :rows="10" responsiveLayout="scroll">
        <template #header>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold">Listado de Facturas</span>
            <span>
              <InputText v-model="searchQuery" placeholder="Buscar..." class="p-inputtext-sm" />
            </span>
          </div>
        </template>
        <Column field="id" header="ID" />
        <Column field="cliente" header="Cliente" />
        <Column field="monto" header="Monto" />
        <Column field="fecha" header="Fecha" />
        <Column header="Acciones" :body="actionTemplate" />
      </DataTable>
  
      <!-- Diálogo para generar factura -->
      <Dialog header="Generar Factura" v-model:visible="showInvoiceDialog" modal class="w-1/3">
        <!-- Formulario de factura aquí -->
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
  
  const searchQuery = ref('');
  const invoices = ref([]);
  const showInvoiceDialog = ref(false);
  
  const actionTemplate = () => {
    return h('Button', {
      label: 'Ver',
      icon: 'pi pi-eye',
      class: 'p-button-info',
      onClick: viewInvoice,
    });
  };
  
  function viewInvoice(rowData) {
    console.log('Ver factura', rowData);
  }
  </script>
  
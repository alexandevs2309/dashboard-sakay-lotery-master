<template>
  <div class="p-6">

   <!-- Diálogo para "Ver cuadros" -->
   <Dialog
      header="Cuadros del día"
      v-model:visible="dialogViewVisible"
      :style="{ width: '90vw', maxWidth: '800px', height: 'auto' }"
      :modal="true"
      :closable="true"
    >
      <DataTable :value="cuadreData" responsiveLayout="scroll">
        <Column field="empleado" header="Empleado" />
        <Column field="ingresoLoterias" header="Ingreso Loterías" />
        <Column field="premiosPagados" header="Premios [Pagados | Pendientes]" />
        <Column field="totalLoterias" header="Total Loterías" />
        <Column field="balance" header="Balance" />
        <Column header="Acción">
          <template #body="slotProps">
            <Button
              label="Ir al cuadre"
              class="p-button-success"
              icon="pi pi-eye"
              @click="goToCuadre(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </Dialog>


     <!-- Diálogo para "Cuadrar todos" -->
     <Dialog
      header="Confirmar Cuadrar Todos"
      v-model:visible="dialogAllVisible"
      :style="{ width: '90vw', maxWidth: '500px', height: 'auto' }"
      :modal="true"
      :closable="true"
    >
      <p>¿Estás seguro que deseas cuadrar a todos los empleados?</p>
      <div class="flex justify-end mt-4 gap-2">
        <Button label="Cancelar" class="p-button-text" @click="dialogAllVisible = false" />
        <Button label="Cuadrar Todos" class="p-button-danger" @click="confirmSettleAll" />
      </div>
    </Dialog>

 <!-- Diálogo para "Cuadrar Empleados" -->
      <Dialog
          header="Generar Cuadre"
          v-model:visible="dialogVisible"
          :style="{ width: '90vw', maxWidth: '500px', height: 'auto' }"
          :modal="true"
          :closable="true"
      >
          <div class="p-fluid grid grid-cols-2 gap-4">
              <!-- Fila: Empleado -->
              <div class="col-span-2">
                  <label for="empleado" class="block font-bold mb-2">Empleado</label>
                  <Select
                      id="empleado"
                      v-model="form.empleado"
                      :options="empleados"
                      optionLabel="nombre"
                      placeholder="Selecciona un empleado"
                      class="w-full"
                  />
              </div>

              <!-- Fila: Ingresos Loterías y Comisión -->
              <div>
                  <label for="ingresos-loterias" class="block font-bold mb-2">Ingresos Loterías</label>
                  <InputText id="ingresos-loterias" v-model="form.ingresosLoterias" disabled />
              </div>
              <div>
                  <label for="comision" class="block font-bold mb-2">Comisión</label>
                  <InputText id="comision" v-model="form.comision" disabled />
              </div>

              <!-- Fila: Premios Entregados y Premios Pendientes -->
              <div>
                  <label for="premios-entregados" class="block font-bold mb-2">Premios Entregados</label>
                  <InputText id="premios-entregados" v-model="form.premiosEntregados" disabled />
              </div>
              <div>
                  <label for="premios-pendientes" class="block font-bold mb-2">Premios Pendientes</label>
                  <InputText id="premios-pendientes" v-model="form.premiosPendientes" disabled />
              </div>

              <!-- Fila: Total Loterías e Ingresos Recargas -->
              <div class="col-span-2">
                  <label for="total-loterias" class="block font-bold mb-2  ">Total Loterías</label>
                  <InputText id="total-loterias" class="w-full" v-model="form.totalLoterias" disabled />
              </div>
              <div class="col-span-2">
                  <label for="ingresos-recargas" class="block font-bold mb-2">Ingresos Recargas</label>
                  <InputText id="ingresos-recargas" class="w-full" v-model="form.ingresosRecargas" disabled />
              </div>

              <!-- Fila: Saldo Actual Efectivo Extra -->
              <div class="col-span-2">
                  <label for="saldo-extra" class="block font-bold mb-2">Saldo Actual Efectivo Extra</label>
                  <InputText id="saldo-extra" class="w-full" v-model="form.saldoExtra" disabled />
              </div>

              <!-- Fila: Total Cuadre y Fondo a Dejar -->
              <div>
                  <label for="total-cuadre" class="block font-bold mb-2">Total Cuadre</label>
                  <InputText id="total-cuadre" v-model="form.totalCuadre" disabled />
              </div>
              <div>
                  <label for="fondo-dejar" class="block font-bold mb-2">Fondo a Dejar</label>
                  <InputNumber id="fondo-dejar" v-model="form.fondoDejar" class="w-full" mode="decimal" />
              </div>

              <!-- Fila: Total a Entregar -->
              <div class="col-span-2">
                  <label for="total-entregar" class="block font-bold mb-2">Total a Entregar</label>
                  <InputText id="total-entregar" class="w-full" v-model="form.totalEntregar" disabled />
              </div>

              <!-- Fila: Descripción del Cuadre -->
              <div class="col-span-2">
                  <label for="descripcion-cuadre" class="block font-bold mb-2">Descripción del Cuadre</label>
                  <Textarea id="descripcion-cuadre" v-model="form.descripcion" rows="3" class="w-full" />
              </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end mt-4 gap-2">
              <Button label="Cerrar" class="p-button-text" @click="dialogVisible = false" />
              <Button label="Generar Cuadre" class="p-button-success" @click="generarCuadre" />
          </div>
      </Dialog>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <div class="col-span-1">
        <DatePicker v-model="selectedDate" dateFormat="yy-mm-dd" placeholder="Seleccione una fecha" class="w-full" />
      </div>

      <div class="col-span-1 md:col-span-3 flex gap-4">
        <Button
          label="Ver cuadros"
          class="p-button-success w-full"
          icon="pi pi-eye"
          @click="openDialogView"
        />
        <Button
          label="Cuadrar todos"
          class="p-button-success w-full"
          icon="pi pi-users"
          @click="openDialogAll"
        />
        <Button
          label="Cuadrar empleado"
          class="p-button-success w-full"
          icon="pi pi-user-plus"
          @click="openDialogEmployed"
        />
      </div>
    </div>

    <h2 class="text-lg font-semibold mb-4">Cuadre del: {{ formattedDate }}</h2>

    <DataTable :value="cuadreData" responsiveLayout="scroll">
      <Column field="empleado" header="Empleado" />
      <Column field="ingresoLoterias" header="Ingreso Loterías" />
      <Column field="premiosPagados" header="Premios del día [Pagados | Pendientes]" />
      <Column field="totalLoterias" header="Total Loterías" />
      <Column field="totalComisiones" header="Total Comisiones" />
      <Column field="movEfectivo" header="Mov. Efectivo" />
      <Column field="balance" header="Balance" />
      <Column field="cierre" header="Cierre" />
      <Column header="Acción">
        <template #body="slotProps">
          <Button
            label="Ir al cuadre"
            class="p-button-success"
            icon="pi pi-eye"
            @click="goToCuadre(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import Button from 'primevue/button';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Cuadre',
  components: {
    Dialog,
    Button,
    DatePicker,
    Column,
    DataTable,
    Select,
    InputNumber,
    InputText,
    Textarea
  },
  setup() {
    const router = useRouter();
    const dialogVisible = ref(false);
    const dialogViewVisible = ref(false);
    const dialogAllVisible = ref(false);
    const selectedDate = ref(new Date());




    const empleados = ref([
          { id: null, nombre: 'Seleccione un empleado' },
          { id: 1, nombre: 'Juan Lopez' },
          { id: 2, nombre: 'Ana Gómez' }
      ]);






      const form = ref({
      empleado: null,
      ingresosLoterias: 0,
      comision: 0,
      premiosEntregados: 0,
      premiosPendientes: 0,
      totalLoterias: 0,
      ingresosRecargas: 0,
      saldoExtra: 400,
      totalCuadre: 400,
      fondoDejar: null,
      totalEntregar: 400,
      descripcion: ''
    });

    const cuadreData = ref([
      {
        id: 1,
        empleado: "Juan Lopez",
        ingresoLoterias: "0",
        premiosPagados: "0 | 0",
        totalLoterias: "0",
        totalComisiones: "0.00",
        movEfectivo: "400.00",
        balance: "400.00",
        cierre: "400.00"
      },
      {
        id: 2,
        empleado: "Ana Gómez",
        ingresoLoterias: "1,430",
        premiosPagados: "0 | 0",
        totalLoterias: "1,430",
        totalComisiones: "143.00",
        movEfectivo: "0.00",
        balance: "1,287",
        cierre: "1,287.00"
      }
    ]);

    const formattedDate = computed(() =>
      selectedDate.value ? selectedDate.value.toLocaleDateString() : ''
    );

    const openDialogEmployed = () => {
      dialogVisible.value = true;
    };

    const closeDialog = () => {
      dialogVisible.value = false;
    };

    const openDialogView = () => {
      dialogViewVisible.value = true;
      console.log("Mostrando cuadros para la fecha:", formattedDate.value);
    };

    const openDialogAll  = () => {
      dialogAllVisible.value = true;
      console.log("Cuadrando todos los empleados");
    };

      const generarCuadre = () => {
          if (!form.value.empleado) {
              alert("Debes seleccionar un empleado.");
              return;
          }

          if (form.value.fondoDejar === null || form.value.fondoDejar < 0) {
              alert("El fondo a dejar debe ser mayor o igual a 0.");
              return;
          }

          // Aquí puedes validar otros campos si es necesario.

          console.log("Datos del formulario:", form.value);
          alert("Cuadre generado con éxito!");
          dialogVisible.value = false;
      };


      const goToCuadre = (data) => {
      router.push({
        name: "cuadre_user",
        params: { id: data.id }
      });
    };

    return {
      dialogVisible,
      dialogViewVisible,
      dialogAllVisible,
      selectedDate,
      empleados,
      form,
      cuadreData,
      formattedDate,
      openDialogEmployed,
      openDialogView,
      openDialogAll,
      closeDialog,
     
      generarCuadre,
      goToCuadre
    };
  }
};
</script>

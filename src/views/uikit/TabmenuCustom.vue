<script setup>
import { onMounted, ref, watch } from 'vue';
import AdministrarEmpleados from '../pages/AdministrarEmpleados.vue';
import AdminModulos from '../pages/AdminModulos.vue';
import AdminPremios from '../pages/AdminPremios.vue';
import AdminPresupuestos from '../pages/AdminPresupuestos.vue';
import BancaAdmin from '../pages/BancaAdmin.vue';
import MontosGenrales from '../pages/MontosGenrales.vue';

// Definir el estado inicial
const activeTab = ref('datos');

// Asegurarse de que se establezca el tab inicial al montar el componente
onMounted(() => {
    activeTab.value = 'datos';
    console.log('Componente montado');
});

watch(activeTab, (newValue) => {
    console.log('Tab activo:', newValue);
});
</script>
    
<template>
    <div class="card">
        <Tabs v-model="activeTab" defaultValue="1">
            <TabList>
                <Tab value="0">Datos</Tab>
                <Tab value="1">Montos</Tab>
                <Tab value="2">Presupuestos</Tab>
                <Tab value="3">Premios</Tab>
                <Tab value="4">Empleados</Tab>
                <Tab value="5">Módulos</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <BancaAdmin />
                </TabPanel>
                <TabPanel value="1">
                    <MontosGenrales />
                </TabPanel>
                <TabPanel value="2">
                    <AdminPresupuestos />
                </TabPanel>
                <TabPanel value="3">
                    <AdminPremios />
                </TabPanel>
                <TabPanel value="4">
                    <AdministrarEmpleados />
                </TabPanel>
                <TabPanel value="5">
                    <AdminModulos />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
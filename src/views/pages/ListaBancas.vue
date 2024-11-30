<script setup>
import { BancaService } from '@/service/BancaService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
    BancaService.getBancas().then((data) => (bancas.value = data));
});

const toast = useToast();
const dt = ref();
const bancas = ref();
const bancaDialog = ref(false);
const deleteBancaDialog = ref(false);
const deleteBancasDialog = ref(false);
const banca = ref({});
const selectedBancas = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'ACTIVA', value: 'activa' },
    { label: 'INACTIVA', value: 'inactiva' }
]);

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    banca.value = {};
    submitted.value = false;
    bancaDialog.value = true;
}

function hideDialog() {
    bancaDialog.value = false;
    submitted.value = false;
}

function saveBanca() {
    submitted.value = true;

    if (banca?.value.name?.trim()) {
        if (banca.value.id) {
            banca.value.status = banca.value.status.value ? banca.value.status.value : banca.value.status;
            bancas.value[findIndexById(banca.value.id)] = banca.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Banca Updated', life: 3000 });
        } else {
            banca.value.id = createId();
            banca.value.code = createId();
            bancas.value.push(banca.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Banca Created', life: 3000 });
        }

        bancaDialog.value = false;
        banca.value = {};
    }
}

function editBanca(b) {
    banca.value = { ...b };
    bancaDialog.value = true;
}

function confirmDeleteBanca(b) {
    banca.value = b;
    deleteBancaDialog.value = true;
}

function deleteBanca() {
    bancas.value = bancas.value.filter((val) => val.id !== banca.value.id);
    deleteBancaDialog.value = false;
    banca.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Banca Deleted', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < bancas.value.length; i++) {
        if (bancas.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteBancasDialog.value = true;
}

function deleteSelectedBancas() {
    bancas.value = bancas.value.filter((val) => !selectedBancas.value.includes(val));
    deleteBancasDialog.value = false;
    selectedBancas.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Bancas Deleted', life: 3000 });
}

// En ListaBancas.vue

const router = useRouter();

const redirectToBancaAdmin = (banca) => {
    console.log("Navegando a banca:", banca.id);
    // Usa el name de la ruta en lugar de la URL directa
    router.push({
        name: 'bancaAdmin',
        params: { id: banca.id }
    }).catch(err => {
        console.error('Error de navegación:', err);
    });
};

function getStatusLabel(status) {
    switch (status) {
        case 'ACTIVA':
            return 'success';
        case 'INACTIVA':
            return 'danger';
        default:
            return null;
    }
}
</script>

<template>
    <div>
        <div class="card">
            <DataTable ref="dt" v-model:selection="selectedBancas" :value="bancas" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} bancas">
                <!-- Barra de búsqueda -->
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Lista de Bancas</h4>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </div>
                </template>

                <Column field="code" header="Code" sortable style="min-width: 12rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 16rem">
                    <template #body="slotProps">
                        <span @click="redirectToBancaAdmin(slotProps.data)" class="text-blue-500 cursor-pointer">
                            {{ slotProps.data.name }}
                        </span>
                    </template>
                </Column>
                <Column field="location" header="Location" sortable style="min-width: 12rem"></Column>
                <Column field="dailyRevenue" header="Daily Revenue" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.dailyRevenue) }}
                    </template>
                </Column>
                <Column field="monthlyRevenue" header="Monthly Revenue" sortable style="min-width: 10rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.monthlyRevenue) }}
                    </template>
                </Column>
                <Column field="status" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="redirectToBancaAdmin(slotProps.data)" /> 
                        
                        <Button icon="pi pi-trash" outlined rounded
                            severity="danger" @click="confirmDeleteBanca(slotProps.data)" />

                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="bancaDialog" :style="{ width: '450px' }" header="Banca Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Name</label>
                    <InputText id="name" v-model.trim="banca.name" required="true" autofocus
                        :invalid="submitted && !banca.name" fluid />
                    <small v-if="submitted && !banca.name" class="text-red-500">Name is required.</small>
                </div>
                <div>
                    <label for="location" class="block font-bold mb-3">Location</label>
                    <InputText id="location" v-model="banca.location" required="true" fluid />
                </div>
                <div>
                    <label for="status" class="block font-bold mb-3">Status</label>
                    <Select id="status" v-model="banca.status" :options="statuses" optionLabel="label"
                        placeholder="Select a Status" fluid></Select>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveBanca" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteBancaDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="banca">Are you sure you want to delete <b>{{ banca.name }}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteBancaDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteBanca" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteBancasDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="banca">Are you sure you want to delete the selected bancas?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteBancasDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedBancas" />
            </template>
        </Dialog>
    </div>
</template>

<template>
    <div class="profile-container bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-6">
      <div class="w-full max-w-full">
        <div class="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <!-- Profile Header -->
          <div class="relative">
            <!-- Background Cover -->
            <div class="h-48  bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <!-- Overlay with Subtle Pattern -->
              <div class="absolute inset-0 opacity-20 bg-pattern"></div>
              
              <!-- Profile Picture -->
              <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <div class="border-6 border-white rounded-full shadow-xl">
                  <Avatar 
                    :image="user.profilePicture || defaultAvatar" 
                    size="xlarge" 
                    shape="circle" 
                    class="w-36 h-36 object-cover border-4 border-white"
                    @click="openImageCropModal"
                  />
                </div>
              </div>
            </div>
          </div>
  
          <!-- User Details -->
          <div class="pt-24 px-8 text-center">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-2">{{ user.first_name}} {{ user.last_name }} </h2>
            <p class="text-lg text-gray-600 mb-4">{{ user.role }}</p>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-3 gap-4 mb-6 bg-gray-50 rounded-2xl p-4 shadow-md">
              <div class="text-center">
                <h3 class="text-sm uppercase text-gray-500 mb-1">Banca</h3>
                <p class="font-bold text-blue-600">{{ user.assignedBanca || 'No asignada' }}</p>
              </div>
              <div class="text-center">
                <h3 class="text-sm uppercase text-gray-500 mb-1">Nivel de Acceso</h3>
                <p class="font-bold text-purple-600">{{ user.accessLevel || 'No Asignado' }}</p>
              </div>
              <div class="text-center">
                <h3 class="text-sm uppercase text-gray-500 mb-1">Correo</h3>
                <p class="font-bold text-green-600">{{ user.email }}</p>
              </div>
            </div>
  
            <!-- Action Buttons -->
            <div class="flex justify-center space-x-4 mb-8">
              <Button 
                label="Editar Perfil" 
                icon="pi pi-pencil"
                class="p-button-raised p-button-rounded p-button-primary"
                @click="openEditProfileDialog"
              />
              <Button 
                label="Cambiar Contraseña" 
                icon="pi pi-lock"
                class="p-button-raised p-button-rounded p-button-warning"
                @click="openChangePasswordDialog"
              />
              <Button 
                label="Configuraciones" 
                icon="pi pi-cog"
                class="p-button-raised p-button-rounded p-button-info"
                @click="openPreferencesDialog"
              />
            </div>

            <!-- Profile Sections Tabs -->
            <TabView>
              <TabPanel header="Información">
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-4">Biografía</h3>
                  <p class="text-gray-700">{{ user.biography || 'No hay biografía disponible' }}</p>
                </div>
                <div class="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 class="text-lg font-semibold mb-3">Habilidades</h3>
                    <div class="flex flex-wrap gap-2">
                      <Tag v-for="skill in user.skills" :key="skill" :value="skill" class="mr-2 mb-2" />
                    </div>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold mb-3">Logros</h3>
                    <div class="flex flex-wrap gap-2">
                      <Badge v-for="badge in user.badges" :key="badge.id" :value="badge.name" :severity="badge.type" class="mr-2 mb-2" />
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel header="Actividad">
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-4">Historial de Actividad</h3>
                  <Timeline :value="user.activityLog" align="alternate">
                    <template #content="slotProps">
                      <Card>
                        <template #title>{{ slotProps.item.title }}</template>
                        <template #subtitle>{{ slotProps.item.date }}</template>
                        <template #content>
                          <p>{{ slotProps.item.description }}</p>
                        </template>
                      </Card>
                    </template>
                  </Timeline>
                </div>
              </TabPanel>
              <TabPanel header="Contacto">
                <div class="p-4">
                  <h3 class="text-xl font-semibold mb-4">Información de Contacto</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700">Teléfono</label>
                      <p class="mt-1">{{ user.phone || 'No disponible' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700">LinkedIn</label>
                      <a :href="user.linkedinProfile" target="_blank" class="text-blue-600 hover:underline">
                        {{ user.linkedinProfile || 'No configurado' }}
                      </a>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
  
        <!-- Existing Dialogs (Edit Profile, Change Password) from previous version -->
        <!-- ... (previous dialogs remain the same) ... -->

        <!-- Preferences Dialog -->
        <Dialog 
          v-model:visible="preferencesDialogVisible" 
          header="Configuraciones" 
          :style="{ width: '600px' }"
          :modal="true"
          class="custom-dialog"
        >
          <template #header>
            <div class="flex items-center">
              <i class="pi pi-cog mr-3 text-2xl text-blue-600"></i>
              <h3 class="text-xl font-semibold text-gray-800">Preferencias</h3>
            </div>
          </template>
          <div class="p-fluid">
            <!-- Theme Preferences -->
            <div class="field mb-5">
              <label class="block text-gray-700 mb-2 font-semibold">Tema de la Aplicación</label>
              <div class="flex space-x-4">
                <div 
                  v-for="theme in themes" 
                  :key="theme.value"
                  @click="selectTheme(theme.value)"
                  class="cursor-pointer p-2 rounded-lg flex items-center"
                  :class="{
                    'border-2 border-blue-500': preferences.theme === theme.value,
                    'hover:bg-gray-100': preferences.theme !== theme.value
                  }"
                >
                  <div 
                    class="w-8 h-8 rounded-full mr-2" 
                    :style="{ backgroundColor: theme.color }"
                  ></div>
                  <span>{{ theme.label }}</span>
                </div>
              </div>
            </div>

            <!-- Language Preferences -->
            <div class="field mb-5">
              <label class="block text-gray-700 mb-2 font-semibold">Idioma</label>
              <Dropdown 
                v-model="preferences.language" 
                :options="languages"
                optionLabel="label"
                optionValue="value"
                placeholder="Selecciona un idioma"
                class="w-full"
              />
            </div>

            <!-- Notification Preferences -->
            <div class="field mb-5">
              <label class="block text-gray-700 mb-2 font-semibold">Configuración de Notificaciones</label>
              <div class="flex flex-col space-y-3">
                <div class="flex items-center">
                  <Checkbox 
                    v-model="preferences.notifications.email" 
                    :binary="true"
                    class="mr-2"
                  />
                  <label>Notificaciones por Correo Electrónico</label>
                </div>
                <div class="flex items-center">
                  <Checkbox 
                    v-model="preferences.notifications.push" 
                    :binary="true"
                    class="mr-2"
                  />
                  <label>Notificaciones Push</label>
                </div>
                <div class="flex items-center">
                  <Checkbox 
                    v-model="preferences.notifications.sms" 
                    :binary="true"
                    class="mr-2"
                  />
                  <label>Notificaciones SMS</label>
                </div>
              </div>
            </div>

            <!-- Two-Factor Authentication -->
            <div class="field mt-6">
              <label class="block text-gray-700 mb-2 font-semibold">Seguridad</label>
              <div class="flex items-center justify-between">
                <span>Autenticación de Dos Factores</span>
                <InputSwitch v-model="preferences.twoFactorAuth" />
              </div>
              <small class="text-gray-500">Protege tu cuenta con una capa adicional de seguridad</small>
            </div>

            <!-- Save Preferences Button -->
            <div class="field mt-6">
              <Button 
                label="Guardar Configuraciones" 
                icon="pi pi-check"
                class="w-full p-button-lg p-button-rounded p-button-success"
                @click="savePreferences"
              />
            </div>
          </div>
        </Dialog>

        <!-- Two-Factor Authentication Modal -->
        <Dialog 
          v-model:visible="twoFactorSetupVisible" 
          header="Configurar Autenticación de Dos Factores" 
          :style="{ width: '500px' }"
          :modal="true"
        >
          <div class="p-fluid">
            <div v-if="!twoFactorEnabled" class="text-center">
              <img :src="twoFactorQRCode" alt="QR Code" class="mx-auto mb-4"/>
              <p class="mb-4">Escanea este código QR con tu aplicación de autenticación</p>
              <InputText 
                v-model="twoFactorCode"
                placeholder="Introduce el código de verificación"
                class="w-full mb-4"
              />
              <Button 
                label="Verificar y Activar" 
                @click="verifyTwoFactor"
                class="w-full p-button-success"
              />
            </div>
            <div v-else class="text-center">
              <i class="pi pi-check-circle text-6xl text-green-500 mb-4"></i>
              <h3 class="text-xl mb-4">Autenticación de Dos Factores Activada</h3>
              <Button 
                label="Desactivar" 
                @click="disableTwoFactor"
                class="w-full p-button-danger"
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import { ProfileService } from '@/service/ProfileService'

// PrimeVue Imports
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tag from 'primevue/tag'
import Badge from 'primevue/badge'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'
import InputSwitch from 'primevue/inputswitch'

// Default avatar (replace with your actual default avatar path)
const defaultAvatar = '/public/demo/images/user.png'

// Toast notification
const toast = useToast()

// User data (it will be populated after the API call)
const user = ref({
  fullName: '',
  email: '',
  role: '',
  profilePicture: '',
  assignedBanca: '',
  accessLevel: '',
  biography: '',
  skills: [],
  badges: [],
  phone: '',
  linkedinProfile: '',
  activityLog: []
})

// Fetch user profile on mounted
onMounted(async () => {
  try {
    const response = await ProfileService.getProfile()  
    console.log(response); // Verificar la respuesta de la API

    user.value = response  // Asignar los datos obtenidos a la variable user
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el perfil' })
  }
})

// Preferences Management
const preferencesDialogVisible = ref(false)
const preferences = ref({
theme: 'light',
language: 'es',
notifications: {
email: true,
push: false,
sms: false
  },
  twoFactorAuth: false
})

// Other code for preferences and two-factor setup remains the same
</script>

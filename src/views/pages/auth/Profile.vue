<script>
import { ref, onMounted, computed } from 'vue';
import apiClient from '@/api/axios';
import Cookies from 'js-cookie';
import { ProfileService } from '@/service/ProfileService';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';

import { useAuthStore } from '@/stores/auth';
import ConfirmDialog from 'primevue/confirmdialog';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

export default {
    components: {
        Button,
        Checkbox,
        InputText,
        InputMask,
        Password,
        InputText,
        FloatingConfigurator,
        ConfirmDialog,
        Toast
    },
    setup() {
        const toast = useToast();
        const confirm = useConfirm();

        const userStatus = ref('online');

        const twoFactorEnabled = ref(false); // Usar un ref simple


        const showVerificationInput = ref(false);
        const twoFactorCode = ref('');


        const isLoading = ref(false);
        const user = ref({
            first_name: '',
            last_name: '',
            email: '',
            access_level: '',
            phone: '',
            address: '',
            role: '',
        });

        const canEdit = computed(() => user.value.role === 'ADMIN');

        const userInitials = computed(() => {
            const firstNameInitial = user.value.first_name ? user.value.first_name[0]?.toUpperCase() : '';
            const lastNameInitial = user.value.last_name ? user.value.last_name[0]?.toUpperCase() : '';
            return `${firstNameInitial}${lastNameInitial}`;
        });

        const passwords = ref({
            current: '',
            new: '',
            confirm: ''
        });

        const toggleTwoFactor = async () => {
            try {
               
                const newState = !twoFactorEnabled.value;

                const response = await apiClient.post('/two_factor/toggle/', {
                        enable_2fa: newState
                    });

                    console.log('Respuesta del servidor:', response.data);

                    twoFactorEnabled.value = newState;


                toast.add({
                    severity: 'success',
                    summary: '2FA',
                    detail: response.data.message || (newState ? '2FA habilitado.' : '2FA deshabilitado.' ),
                    life: 5000
                });

                showVerificationInput.value = newState;

                
            } catch (error) {
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo actualizar 2FA',
                    life: 3000
                });
            }
        };

        const verifyTwoFactor = async () => {
            try {
                const response = await apiClient.post('/2fa/verify/', {
                    
                    code: twoFactorCode.value
                });

                toast.add({
                    severity: 'success',
                    summary: 'Código Verificado',
                    detail: response.data.message,
                    life: 3000
                });

                showVerificationInput.value = false; // Ocultar el input después de verificar
            } catch (error) {
                toast.add({
                    severity: 'error',
                    summary: 'Código Incorrecto',
                    detail: 'El código proporcionado es incorrecto.',
                    life: 3000
                });
            }
        };

        const validatePasswords = computed(() => {
            if (passwords.value.new && passwords.value.confirm && passwords.value.new !== passwords.value.confirm) {
                return 'Las contraseñas no coinciden';
            }
            if (passwords.value.new && passwords.value.new.length < 8) {
                return 'La contraseña debe tener al menos 8 caracteres';
            }
            return null;
        });

        const fetchUserData = async () => {
            try {
                const response = await apiClient.get('/profile/');
               
                if (response.status === 200) {
                    const data = response.data;

                    user.value.first_name = data.first_name || '';
                    user.value.last_name = data.last_name || '';
                    user.value.email = data.email || '';
                    user.value.access_level = data.access_level || '';

                    user.value.profile = data.profile || {};

                    user.value.phone = data.profile?.phone || '';
                    user.value.address = data.profile?.address || '';
                    user.value.biography = data.profile?.biography || '';

                    twoFactorEnabled.value = response.data.two_factor_enabled || false;
                    user.value.role = data.role || '';

                    Cookies.set(
                        'user',
                        JSON.stringify({
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email
                        }),
                        { expires: 7 }
                    );
                }
            } catch (error) {
                console.error('Error al cargar datos del usuario:', error);

                // Intentar recuperar datos de la cookie si falla el backend
                const userCookie = Cookies.get('user');
                if (userCookie) {
                    try {
                        const userData = JSON.parse(userCookie);
                        user.value.first_name = userData.first_name || '';
                        user.value.last_name = userData.last_name || '';
                        user.value.email = userData.email || '';
                    } catch (parseError) {
                        console.error('Error al parsear los datos del usuario desde la cookie:', parseError);
                    }
                }
            }
        };

        const saveChanges = async () => {
            try {
                // Validar contraseñas si se están cambiando
                const passwordValidationMessage = validatePasswords.value; // Obtén el mensaje de error si las contraseñas no son válidas
                if (passwordValidationMessage) {
                    toast.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: passwordValidationMessage,
                        life: 3000
                    });
                    return; // Si las contraseñas no son válidas, no proceder con la actualización
                }

                const formData = new FormData();
                formData.append('first_name', user.value.first_name);
                formData.append('email', user.value.email);
                formData.append('phone', user.value.phone);
                formData.append('address', user.value.address);
                formData.append('two_factor', twoFactorEnabled.value);

                if (passwords.value.current && passwords.value.new) {
                    formData.append('current_password', passwords.value.current);
                    formData.append('new_password', passwords.value.new);
                }

                const response = await ProfileService.updateProfile(formData);

                if (response && response.status === 'Perfil actualizado') {
                    passwords.value.current = '';
                    passwords.value.new = '';
                    passwords.value.confirm = '';

                    await fetchUserData();
                    toast.add({
                        severity: 'success',
                        summary: 'Perfil Actualizado',
                        detail: 'Los cambios se han guardado exitosamente.',
                        life: 3000
                    });
                } else {
                    throw new Error('No se pudo actualizar el perfil');
                }
            } catch (error) {
                console.error('Error completo:', error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: error.message || 'Error al guardar los cambios.',
                    life: 3000
                });
            }
        };

        const requireConfirmation = () => {
            confirm.require({
                group: 'headless',
                header: '¿Estás seguro?',
                message: 'Por favor confirme para continuar..',
                accept: () => {
                    toast.add({ severity: 'info', summary: 'Confirmado', detail: 'Has Aceptado', life: 3000 });
                    saveChanges();
                },
                reject: () => {
                    toast.add({ severity: 'error', summary: 'Rechazado', detail: 'Has rechado', life: 3000 });
                }
            });
        };
        onMounted(fetchUserData);

        return {
            user,
            passwords,
            isLoading,
            saveChanges,
            validatePasswords,
            userInitials,
            canEdit,
            userStatus,
            twoFactorEnabled,
            toggleTwoFactor,
            showVerificationInput,
            twoFactorCode,
            verifyTwoFactor,
            requireConfirmation
        };
    }
};
</script>

<template>
    <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="profile-component max-w-6xl mx-auto p-6 bg-surface-50 dark:bg-surface-900 shadow-lg rounded-lg space-y-8">
            <!-- Header -->
            <div class="text-center">
                <h2 class="text-3xl font-bold text-surface-700 dark:text-surface-0 mb-2">{{ user.first_name }} {{ user.last_name }}</h2>
                <p class="text-surface-500 dark:text-surface-400">Administra tu información personal y configuración de seguridad</p>

                <p class="text-surface-500 dark:text-surface-400 mt-2 text-sm md:text-base font-medium hover:text-primary-600 dark:hover:text-primary-400">
                    <strong class="text-surface-700 dark:text-surface-200">Nivel de Acceso:</strong>
                    {{ user.access_level || 'No especificado' }}
                </p>
            </div>
            <div class="flex items-center justify-center">
                <Avatar size="xlarge" class="mx-2" :style="{ backgroundColor: userStatus === 'online' ? 'green' : 'gray' }">
                    {{ userInitials }}
                </Avatar>
                <span :class="{ 'text-green-500': userStatus === 'online', 'text-gray-500': userStatus !== 'online' }">
                    {{ userStatus === 'online' ? 'En línea' : 'Desconectado' }}
                </span>
            </div>

            <!-- Personal Information Section -->
            <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
                <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Información Personal</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Nombre</label>
                        <InputText v-model="user.first_name" :disabled="!canEdit" type="text" size="large" placeholder="Tu nombre completo" />
                    </div>

                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Apellido</label>
                        <InputText v-model="user.last_name" :disabled="!canEdit" type="text" size="large" placeholder="Tu Apellido completo" />
                    </div>
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Correo Electrónico</label>
                        <InputText v-model="user.email" type="email" size="large" placeholder="Tu correo electrónico" />
                    </div>

                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Teléfono</label>
                        <InputText v-model="user.phone" type="tel" size="large" placeholder="Tu número de teléfono" />
                    </div>
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Dirección</label>
                        <InputText v-model="user.address" type="text" size="large" placeholder="Tu dirección" />
                    </div>
                </div>
            </div>

            <!-- Password Section -->
            <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
                <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Cambiar Contraseña</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Contraseña Actual</label>
                        <Password v-model="passwords.current" type="password" toggleMask size="large" placeholder="Ingresa tu contraseña actual" />
                    </div>
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Nueva Contraseña</label>
                        <Password v-model="passwords.new" type="password" size="large" placeholder="Ingresa una nueva contraseña" toggleMask />
                    </div>
                    <div>
                        <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Confirmar Nueva Contraseña</label>
                        <Password v-model="passwords.confirm" type="password" size="large" placeholder="Confirma tu nueva contraseña" toggleMask />

                        <small v-if="validatePasswords" class="text-red-500">{{ validatePasswords }}</small>
                    </div>
                </div>
            </div>

            <!-- Opciones de Seguridad -->
            <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
                <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Opciones de Seguridad</h3>
                <div class="flex items-center space-x-4">
                    <!-- Checkbox para habilitar/deshabilitar 2FA -->
                    <Checkbox 
                            :modelValue="twoFactorEnabled"
                            @update:modelValue="toggleTwoFactor"
                            :binary="true"
                        />                    
                        <label for="two-factor" class="text-surface-700 dark:text-surface-300"> Autenticación de Dos Factores </label>

                    <!-- Mostrar campo para el código de 2FA solo si es necesario -->
                    <div v-if="showVerificationInput">
                        <h3>Ingrese el código de verificación</h3>
                        <InputText v-model="twoFactorCode" placeholder="Código de 6 dígitos" />
                        <Button label="Verificar Código" @click="verifyTwoFactor" />
                    </div>
                </div>
            </div>

            <!-- Save Button -->
            <Button type="button" @click="requireConfirmation()" label="Guardar Cambios"></Button>
        </div>
    </div>

    
        <ConfirmDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded">
                    <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex items-center gap-2 mt-6">
                        <Button label="Aceptar" @click="acceptCallback"></Button>
                        <Button label="Cancel" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>

        <Toast />
    
</template>

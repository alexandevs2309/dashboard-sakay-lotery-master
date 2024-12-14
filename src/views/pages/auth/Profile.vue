<script>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import apiClient from '@/api/axios'
import Cookies from 'js-cookie';
import { ProfileService } from '@/service/ProfileService';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Password from 'primevue/password';
import router from '@/router';

export default {
  components: {
    Button,
    Checkbox,
    InputText,
    InputMask,
    Password,
    InputText,
    FloatingConfigurator
  },
  setup() {
    const toast = useToast();
    

    const user = ref({
      first_name: '',
      last_name: '',
      email: '',
    });

    const passwords = ref({
      current: '',
      new: '',
      confirm: '',
    });

    const security = ref({
      twoFactor: false,
    });

    const profilePicture = ref(null);
    
    const NewProfilePicture = ref(null);

    // Computed property to handle profile picture display
    const displayProfilePicture = computed(() => {
      return profilePicture.value || '/public/demo/images/user.png';
    });

    const validatePasswords = () => {
      if (passwords.value.new !== passwords.value.confirm) {
        throw new Error('Las contraseñas nuevas no coinciden');
      }
      
      if (passwords.value.new && passwords.value.new.length < 8) {
        throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
      }
    };

    const handleProfilePictureUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        // Validate file type and size
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!allowedTypes.includes(file.type)) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Solo se permiten archivos JPG, PNG y GIF.',
          });
          return;
        }

        if (file.size > maxSize) {
          toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'El archivo es demasiado grande. Máximo 5 MB.',
          });
          return;
        }

        // Create a FileReader to preview the image
        const reader = new FileReader();
        reader.onload = (e) => {
          profilePicture.value = e.target.result;
        };
        reader.readAsDataURL(file);

        // Store the file for upload
        NewProfilePicture.value = file;
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await apiClient.get('/profile/');
        if (response.status === 200) {
          const data = response.data;
          
          user.value.first_name = data.first_name || '';
          user.value.last_name = data.last_name || '';
          user.value.email = data.email || '';
          
          // Actualizar imagen de perfil
          profilePicture.value = data.profile_picture || null;
          
          security.value.twoFactor = data.two_factor || false;

          // Actualizar cookie con los datos más recientes
          Cookies.set('user', JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            profile_picture: data.profile_picture
          }), { expires: 7 }); 
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
            profilePicture.value = userData.profile_picture || null;
          } catch (parseError) {
            console.error('Error al parsear los datos del usuario desde la cookie:', parseError);
          }
        }
      }
    };

    const saveChanges = async () => {
      try {
        // Validar contraseñas si se están cambiando
        if (passwords.value.new || passwords.value.confirm) {
          validatePasswords();
        }

        const formData = new FormData();
        formData.append('first_name', user.value.first_name);
        formData.append('email', user.value.email);
        formData.append('two_factor', security.value.twoFactor);

        // Agregar cambio de contraseña si se proporcionó
        if (passwords.value.current && passwords.value.new) {
          formData.append('current_password', passwords.value.current);
          formData.append('new_password', passwords.value.new);
        }

        // Agregar imagen de perfil si se seleccionó
        if (NewProfilePicture.value) {
          formData.append('profile_picture', NewProfilePicture.value);
          console.log(profilePicture.value)
        }

        const response = await ProfileService.updateProfile(formData);

        if (response && response.status === 'Perfil actualizado') {
          // Limpiar campos de contraseña después de actualizar
          passwords.value.current = '';
          passwords.value.new = '';
          passwords.value.confirm = '';
          profilePicture.value = response.data.profile_picture; 

          // Volver a cargar los datos para asegurar consistencia
          await fetchUserData();

          toast.add({
            severity: 'success',
            summary: 'Perfil Actualizado',
            detail: 'Los cambios se han guardado exitosamente.',
          });
        } else {
          throw new Error('No se pudo actualizar el perfil');
        }
      } catch (error) {
        console.error("Error completo:", error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || 'Error al guardar los cambios.',
        });
      }
    };

    // Cargar datos al montar el componente
    onMounted(fetchUserData);

    return {
      user,
      passwords,
      security,
      displayProfilePicture,
      handleProfilePictureUpload,
      saveChanges,
    };
  },
};
</script>`

`<template>
  <FloatingConfigurator />
  
  <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
    <div class="profile-component max-w-4xl mx-auto p-6 bg-surface-50 dark:bg-surface-900 shadow-lg rounded-lg space-y-8">
    <!-- Header -->
    <div class="text-center">
      <h2 class="text-3xl font-bold text-surface-700 dark:text-surface-0 mb-2">{{ user.first_name }} {{ user.last_name }}</h2>
      <p class="text-surface-500 dark:text-surface-400">Administra tu información personal y configuración de seguridad</p>
    </div>

    <!-- Profile Picture Section -->
    <div class="text-center">
      <div class="inline-block relative">
        <img 
          :src="displayProfilePicture" 
          alt="Foto de perfil" 
          class="w-28 h-28 rounded-full border-4 border-surface-200 dark:border-surface-700 object-cover" 
        />
        <label 
          for="upload" 
          class="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600"
        >
          <i class="pi pi-camera"></i>
          <input 
            id="upload" 
            type="file" 
            @change="handleProfilePictureUpload" 
            class="hidden" 
            accept="image/jpeg,image/png,image/gif" 
          />
        </label>
      </div>
      <p class="mt-2 text-sm text-surface-600 dark:text-surface-400">Haz clic en el icono para cambiar la foto</p>
    </div>

    <!-- Personal Information Section -->
    <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Información Personal</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Nombre</label>
          <InputText 
            v-model="user.first_name" 
            type="text" 
            size="large" 
            placeholder="Tu nombre completo" 
          />
        </div>
        <div>
          <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Correo Electrónico</label>
          <InputText 
            v-model="user.email" 
            type="email" 
            size="large"
            placeholder="Tu correo electrónico" 
          />
        </div>
      </div>
    </div>

    <!-- Password Section -->
    <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Cambiar Contraseña</h3>
      <div class="space-y-4">
        <div>
          <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Contraseña Actual</label>
          <Password 
            v-model="passwords.current" 
            type="password" 
            toggleMask
            size="large"
            placeholder="Ingresa tu contraseña actual" 
          />
        </div>
        <div>
          <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Nueva Contraseña</label>
          <Password v-model="passwords.new"  type="password" size="large" placeholder="Ingresa una nueva contraseña" toggleMask
          />
        </div>
        <div>
          <label class="block font-medium text-surface-600 dark:text-surface-300 mb-2">Confirmar Nueva Contraseña</label>
          <Password v-model="passwords.confirm" type="password" size="large" placeholder="Confirma tu nueva contraseña" toggleMask />

       
        </div>
      </div>
    </div>

    <!-- Security Options -->
    <div class="bg-white dark:bg-surface-800 p-6 rounded-md shadow-md">
      <h3 class="text-lg font-semibold text-surface-700 dark:text-surface-0 mb-4">Opciones de Seguridad</h3>
      <div class="flex items-center space-x-4">
        <Checkbox 
          v-model="security.twoFactor" 
          inputId="two-factor" 
          :binary="true" 
          class="dark:border-surface-600" 
        />
        <label 
          for="two-factor" 
          class="text-surface-700 dark:text-surface-300"
        >
          Autenticación de Dos Factores
        </label>
      </div>
    </div>

    <!-- Save Button -->
    <div class="text-center">
      <Button 
        @click="saveChanges" 
        type="submit" 
        class="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
      >
        Guardar Cambios
      </Button>
    </div>
    </div>
  </div>
</template>


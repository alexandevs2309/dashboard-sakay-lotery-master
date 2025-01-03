import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';  // Importa Pinia
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';



import '@/assets/styles.scss';
import '@/assets/tailwind.css';

const pinia = createPinia();  // Crea la instancia de Pinia
const app = createApp(App);


app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(pinia);  // Registra Pinia con Vue
app.mount('#app');

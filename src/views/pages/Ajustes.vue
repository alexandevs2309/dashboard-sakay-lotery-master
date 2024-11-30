<template>
    <div class="p-4">
      <h2 class="text-lg font-bold mb-4">Ajustes</h2>
      <div class="space-y-4">
        <div class="flex items-center space-x-4">
          <span>Notificaciones</span>
          <ToggleButton v-model="notificationsEnabled" />
        </div>
        <div class="flex items-center space-x-4">
          <span>Idioma</span>
          <Select v-model="selectedLanguage" :options="languages" optionLabel="label" class="w-full md:w-1/2" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import ToggleButton from 'primevue/togglebutton';
import { ref } from 'vue';
  
  const notificationsEnabled = ref(true);
  const selectedLanguage = ref(null);
  const languages = [
    { label: 'Español', value: 'es' },
    { label: 'Inglés', value: 'en' },
  ];
  </script>
  
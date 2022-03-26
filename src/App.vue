<template>
  <header class="flex items-center justify-center bg-gradient-to-r from-teal-700 to-blue-700 h-16 shadow-xl mb-4">
    <span class="text-3xl text-white">
      Drag & drop demo
    </span>
  </header>
  <main class="container mx-auto">
    <PetsBrowser />
  </main>
</template>

<script setup lang="ts">
import { setLanguage } from './services/translations';
import PetsBrowser from './views/PetsBrowser.vue';

setLanguage('en');
</script>

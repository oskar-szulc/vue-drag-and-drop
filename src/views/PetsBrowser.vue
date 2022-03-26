<template>
  <transition
    appear
    mode="out-in"
    enter-active-class="transition-opacity duration-150 ease-in-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-opacity duration-150 ease-in-out"
  >
    <div
      v-if="isLoading"
      data-cypress="loading-indicator"
    >
      Loading...
    </div>
    <ErrorBanner
      v-else-if="isError"
      data-cypress="error-banner"
    >
      Something went wrong when loading the pets data. Please refresh the application!
    </ErrorBanner>
    <div
      v-else
      class="flex flex-col md:flex-row gap-4 p-4 flex-grow flex-1"
    >
      <AvailablePets class="w-full" />
      <Favorites class="w-full" />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import usePets from '../services/usePets';

import Favorites from '../components/Favorites.vue';
import AvailablePets from '../components/AvailablePets.vue';
import usePetCollections from '../services/usePetCollections';
import ErrorBanner from "../components/ErrorBanner.vue";

const isLoading = ref(true);
const isError = ref(false);
const { fetch: fetchPets, pets } = usePets();
const { init } = usePetCollections();

onMounted(async () => {
  try {
    await fetchPets();
    init(pets.value);
  }
  catch(error) {
    isError.value = true;
  }
  finally {
    isLoading.value = false;
  }
});

</script>

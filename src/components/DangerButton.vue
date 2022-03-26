<template>
  <BaseButton
    class="bg-rose-100 hover:bg-rose-200 hover:border-rose-300 active:bg-rose-400"
  >
    <slot />
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
</script>

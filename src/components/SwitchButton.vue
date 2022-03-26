<template>
  <button
    class="border-2 p-2 rounded-xl text-sm font-bold transition-colors hover:border-cyan-400"
    :class="{
      'bg-cyan-200 border-cyan-500 text-cyan-800 hover:bg-cyan-300': enabled,
      'bg-cyan-50 border-gray-200 text-gray-600 hover:bg-cyan-100': !enabled,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps< { enabled: boolean } >();
</script>

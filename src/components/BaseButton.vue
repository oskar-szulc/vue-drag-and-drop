<template>
  <button
    v-bind="$attrs"
    class="border-2 p-2 rounded-xl text-sm font-bold transition-colors hover:bg-green-50 hover:border-green-400 active:bg-green-200"
    :class="{
      'bg-gray-100 pointer-events-none': disabled,
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>();
</script>

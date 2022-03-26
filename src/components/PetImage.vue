<template>
  <div
    class="bg-cover bg-center w-full h-full"
    :style="{
      backgroundImage: `url(${src})`,
    }"
  />
</template>

<script setup lang="ts">
defineProps({
  src: {
    type: URL,
    required: true,
  }
})
</script>

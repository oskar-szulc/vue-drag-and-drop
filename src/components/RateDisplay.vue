<template>
  <div>
    <span class="text-xs uppercase"><slot /></span>
    <div class="flex flex-row gap-x-0.5">
      <div
        v-for="i in rate"
        :key="i"
        class="rounded-full w-4 h-4"
        :class="[getColor()]"
      />
      <div
        v-for="i in (5 - rate)"
        :key="i"
        class="rounded-full w-4 h-4 bg-gray-200"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rate: number
  inverted?: boolean
}>();

const colorMapping: {[key: number]: string} = {
  1: 'bg-rose-400',
  2: 'bg-orange-400',
  3: 'bg-lime-500',
  4: 'bg-green-600',
  5: 'bg-green-800'
};

const getColor = () => {
  return props.inverted ? colorMapping[6 - props.rate] : colorMapping[props.rate];
}

</script>

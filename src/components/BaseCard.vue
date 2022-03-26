<template>
  <article
    class="bg-white border-2 border-indigo-200 rounded-lg shadow-lg flex flex-row overflow-hidden transition-colors duration-200 hover:inset-2 hover:border-blue-400 active:border-blue-500 active:shadow-2xl flex-1"
    style="min-height: 10rem; height: 10rem; max-height: 12rem;"
  >
    <div class="w-full min-h-full pointer-events-none">
      <slot name="image" />
    </div>
    <div class="flex flex-col w-full p-4 pointer-events-none bg-white">
      <h2 class="font-bold text-lg text-teal-900">
        <slot name="header" />
      </h2>
      <div class="flex flex-col gap-y-1">
        <slot name="description" />
      </div>
    </div>
  </article>
</template>

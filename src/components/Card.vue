<script setup>
  defineProps({
    artwork: {
      type: Object,
      required: true,
    },
  })
</script>

<template>
  <article class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
    <img
      :src="artwork.image"
      :alt="artwork.title"
      class="h-64 w-full object-contain bg-gray-100"
      loading="lazy"
    />
    <div class="p-4">
      <h2 class="text-xl font-bold">
        {{ artwork.title }}
      </h2>
      <p class="text-gray-600">
        {{ artwork.author }}
      </p>
      <p class="mt-2 text-sm text-gray-500">
        {{ artwork.category }} - {{ artwork.year }}
      </p>
    </div>
  </article>
</template>
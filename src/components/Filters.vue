<script setup>
  defineProps({
    authors: Array,
    categories: Array,
  })

  const search = defineModel('search')
  const author = defineModel('author')
  const category = defineModel('category')

  function reset() {
    search.value = ''
    author.value = ''
    category.value = ''
  }
</script>

<template>
  <div class="mb-6 grid grid-cols-1 gap-4 rounded-xl bg-gray-100 p-4 md:grid-cols-4">
    <input
      v-model="search"
      type="search"
      placeholder="Rechercher une œuvre..."
      class="rounded-lg border border-gray-300 bg-white p-3"
    />
    <select
      v-model="author"
      class="rounded-lg border border-gray-300 bg-white p-3"
    >
      <option value="">Tous les auteurs</option>
      <option v-for="item in authors" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <select
      v-model="category"
      class="rounded-lg border border-gray-300 bg-white p-3"
    >
      <option value="">Toutes les catégories</option>
      <option v-for="item in categories" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
    <button
      @click="reset"
      class="rounded-lg bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
    >
      Réinitialiser
    </button>
  </div>
</template>
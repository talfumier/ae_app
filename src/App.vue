<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { executeQuery } from './services/sparql'
  import ArtworkCard from './components/ArtworkCard.vue'
  import Filters from './components/Filters.vue'

  const artworks = ref([])
  const authors = ref([])
  const categories = ref([])

  const search = ref('')
  const author = ref('')
  const category = ref('')

  const prefix = `
    PREFIX concepts: <https://example.org/artexplorer/concepts#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  `
  async function loadAuthors() {
    const results = await executeQuery(`
      ${prefix}
      SELECT DISTINCT ?name
      WHERE {
        ?author rdf:type concepts:Author ;
          concepts:hasName ?name .
      }
      ORDER BY ?name
    `)
    authors.value = results.map(item => item.name)
  }
  async function loadCategories() {
    const results = await executeQuery(`
      ${prefix}
      SELECT DISTINCT ?name
      WHERE {
        ?cat rdf:type concepts:Category ;
          concepts:hasName ?name .
      }
      ORDER BY ?name
    `)
    categories.value = results.map(item => item.name)
  }
  async function loadArtworks() {
    const query = `
      ${prefix}
      SELECT ?artwork ?title ?author ?category ?year ?image
      WHERE {
        ?artwork rdf:type concepts:Artwork ;
          concepts:hasTitle ?title ;
          concepts:hasAuthor ?person ;
          concepts:hasCategory ?cat ;
          concepts:hasYear ?year ;
          concepts:hasImage ?image .
        ?person concepts:hasName ?author .
        ?cat concepts:hasName ?category .

        FILTER(CONTAINS(LCASE(?title), LCASE(${JSON.stringify(search.value)})))
        ${author.value ? `FILTER(?author = ${JSON.stringify(author.value)})` : ''}
        ${category.value ? `FILTER(?category = ${JSON.stringify(category.value)})` : ''}
      }
      ORDER BY ?title
    `
    artworks.value = await executeQuery(query)
  }

  onMounted(async () => {
    await Promise.all([
      loadAuthors(),
      loadCategories(),
      loadArtworks(),
    ])
  })

  watch([search, author, category], loadArtworks)
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-white shadow-sm mx-auto max-w-7xl p-0">
    <h1 class="my-2 text-3xl font-bold text-red-600">
      ArtExplorer
    </h1>
    <Filters
      v-model:search="search"
      v-model:author="author"
      v-model:category="category"
      :authors="authors"
      :categories="categories"
    />
    <p class="mx-4 my-2 text-gray-500">
      {{ artworks.length }} œuvre(s) trouvée(s)
    </p>
  </header>
  <main class="mx-auto max-w-7xl p-6">
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ArtworkCard
        v-for="artwork in artworks"
        :key="artwork.artwork"
        :artwork="artwork"
      />
    </div>
    <p v-if="artworks.length === 0" class="py-10 text-center text-gray-500">
      Aucune œuvre trouvée.
    </p>
  </main>
</template>
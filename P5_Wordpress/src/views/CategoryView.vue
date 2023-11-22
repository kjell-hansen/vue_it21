<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '../router'
import APIService from '../services/APIService'
import { useCategoriesStore } from '../stores/CategoriesStore'
import { useAuthorsStore } from '../stores/AuthorsStore'

const props = defineProps(['slug'])
const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
})
const catStore = useCategoriesStore()
const categories = computed(() => {
  return catStore.categories
})
const posts = ref([])

onMounted(() => {
  APIService.get(
    'posts?categories=' + categories.value.find((itm) => itm.slug === props.slug)?.id ?? 1
  ).then((response) => {
    posts.value = response.map((itm) => {
      let d = new Date(itm.date)
      itm.date = d.toLocaleDateString()
      return itm
    })
  })
})
</script>

<template>
  <h1>Category: {{ categories.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
  <main>
    <div v-for="itm in posts" :key="itm">
      <h2>
        {{ itm.title.rendered }}
      </h2>
      <p class="date">{{ itm.date }}</p>
      <p v-html="itm?.excerpt.rendered" @click="router.push('/Post/' + itm.slug)" class="excerpt" />
      <p>
        <span class="intense">Författare:</span>&nbsp;
        <a
          v-if="
            authors.find((aut) => {
              return aut.id === itm.author
            })
          "
          :href="'/Author/' + authors.find((aut) => aut.id === itm.author).slug"
          >{{
            authors.find((aut) => {
              return aut.id === itm.author
            })?.name ?? itm.author
          }}
        </a>
      </p>
      <p>
        <span class="intense">Kategorier:</span>&nbsp;
        <span v-for="cat in itm.categories" :key="cat" class="categories">
          <a
            v-if="categories.find((itm) => itm.id === cat)"
            :href="categories.find((itm) => itm.id === cat)?.slug ?? ''"
            >{{ categories.find((itm) => itm.id === cat)?.name ?? '' }}</a
          >&nbsp;
        </span>
      </p>
    </div>
  </main>
</template>
<style scoped>
.intense {
  font-weight: bold;
  text-decoration: underline;
}
.date {
  text-align: right;
  margin-right: 2em;
  font-style: italic;
}
.excerpt {
  cursor: pointer;
}
</style>

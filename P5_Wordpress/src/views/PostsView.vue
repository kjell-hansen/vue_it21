<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '../router'
import APIService from '../services/APIService'
import { useCategoriesStore } from '../stores/CategoriesStore'
import { useAuthorsStore } from '../stores/AuthorsStore'

const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
})
const catStore = useCategoriesStore()
const categories = computed(() => {
  return catStore.categories
})
const tags = ref([])
const posts = ref([])

onMounted(() => {
  let req = []
  req.push(APIService.get('tags?per_page=100'))
  req.push(APIService.get('posts'))
  Promise.all(req).then((responses) => {
    tags.value = responses[0]
    posts.value = responses[1]
  })
})
</script>

<template>
  <h1>Posts</h1>
  <main>
    <div v-for="itm in posts" :key="itm">
      <h2>
        {{ itm.title.rendered }}
      </h2>
      <p class="date">{{ itm.modified?.substr(0, 10) }} {{ itm.modified?.substr(11) }}</p>
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
        <span v-for="cat in itm.categories" :key="cat">
          <a
            v-if="categories.find((itm) => itm.id === cat)"
            :href="categories.find((itm) => itm.id === cat)?.slug ?? ''"
            >{{ categories.find((itm) => itm.id === cat)?.name ?? '' }}</a
          >&nbsp;
        </span>
      </p>
      <p>
        <span class="intense">Tags:</span>&nbsp;
        <span v-for="tag in itm.tags" :key="tag"
          >{{ tags.find((itm) => itm.id === tag)?.name ?? tag }}
          &nbsp;
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

<script setup>
import { computed, onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import { useCategoriesStore } from '../stores/CategoriesStore'

const props = defineProps(['slug'])
const post = ref({})
const catStore = useCategoriesStore()
const categories = computed(() => {
  return catStore.categories
})
const authors = ref([])
const tags = ref([])
const loaded = ref(false)

onMounted(() => {
  let reqs = []
  reqs.push(APIService.get('users'))
  reqs.push(APIService.get('tags?per_page=100'))
  reqs.push(APIService.get('posts?slug=' + props.slug))

  Promise.all(reqs).then((responses) => {
    authors.value = responses[0]
    tags.value = responses[1]
    post.value = responses[2][0]
    loaded.value = true
  })
})
</script>

<template>
  <main v-if="loaded">
    <h1>Post: {{ post.title.rendered }}</h1>
    <p><span class="intense">Status:</span>&nbsp;{{ post.status }}</p>
    <p>
      <span class="intense">Datum:</span>&nbsp;{{ post.modified?.substr(0, 10) }}
      {{ post.modified?.substr(11) }}
    </p>
    <p>
      <span class="intense">Författare:</span>&nbsp;{{
        authors.find((auth) => auth.id === post.author)?.name ?? post.author
      }}
    </p>
    <p>
      <span class="intense">Kategorier:</span>&nbsp;
      <span v-for="cat in post.categories" :key="cat"
        ><a
          v-if="categories.find((itm) => itm.id === cat)"
          :href="'/Category/' + categories.find((itm) => itm.id === cat)?.slug ?? ''"
          >{{ categories.find((itm) => itm.id === cat)?.name ?? '' }}</a
        >
        <span v-else>{{ cat }}</span>
        &nbsp;
      </span>
    </p>
    <p>
      <span class="intense">Tags:</span>&nbsp;
      <span v-for="tag in post.tags" :key="tag"
        >{{ tags.find((itm) => itm.id === tag)?.name ?? tag }}
        &nbsp;
      </span>
    </p>
    <p><span class="intense">Utdrag:</span> <span v-html="post?.excerpt.rendered" /></p>
  </main>
  <main v-else>
    <h1>Post: {{ props.slug }}</h1>
  </main>
</template>
<style scoped>
.intense {
  font-weight: bold;
  text-decoration: underline;
}
</style>

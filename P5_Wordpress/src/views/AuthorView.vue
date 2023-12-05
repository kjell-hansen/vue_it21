<script setup>
/**
 * Vy för att visa alla poster publicerade av en viss användare
 */
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthorsStore } from '../stores/AuthorsStore'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

// Information om vilken författare kommer som en slug via props
const props = defineProps(['slug'])

// Ladda metadata från författarstoren
const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
})
const posts = ref([])
const loading = ref(true)

// Bevaka om vyn laddas om med annan författare
watch(props, async (newProp) => {
  getPost(newProp.slug)
})
onMounted(() => {
  getPost(props.slug)
})

/**
 * Hämta information från API:et om vilka poster en viss författare publicerat
 * @param {*} slug Författarens slug
 */
function getPost(slug) {
  loading.value = true
  APIService.get('posts?author=' + authors.value.find((itm) => itm.slug === slug)?.id ?? 1).then(
    (response) => {
      posts.value = response.map((itm) => {
        let d = new Date(itm.date)
        itm.date = d.toLocaleDateString()
        return itm
      })
      loading.value = false
    }
  )
}

//  Todo
// Implementera "continous scroll"
</script>

<template>
  <h1>Author: {{ authors.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
  <main v-if="!loading">
    <div v-for="itm in posts" :key="itm" class="posts">
      <PostItem :postitem="itm" />
    </div>
  </main>
  <main v-else class="loading">
    <img alt="loading" src="@/assets/ox2-flow.gif" width="125" />
  </main>
</template>
<style scoped>
.posts:nth-child(odd) {
  background-color: beige;
}
</style>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useAuthorsStore } from '../stores/AuthorsStore'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

const props = defineProps(['slug'])
const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
})
const posts = ref([])

watch(props, async (newProp) => {
  getPost(newProp.slug)
})
onMounted(() => {
  getPost(props.slug)
})
function getPost(slug) {
  APIService.get('posts?author=' + authors.value.find((itm) => itm.slug === slug)?.id ?? 1).then(
    (response) => {
      posts.value = response.map((itm) => {
        let d = new Date(itm.date)
        itm.date = d.toLocaleDateString()
        return itm
      })
    }
  )
}
</script>

<template>
  <h1>Author: {{ authors.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
  <main>
    <div v-for="itm in posts" :key="itm" class="posts">
      <PostItem :postitem="itm" />
    </div>
  </main>
</template>
<style scoped>
.posts:nth-child(odd) {
  background-color: beige;
}
</style>

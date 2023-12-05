<script setup>
/**
 * Vy för att visa alla inlägg i API:et
 */
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

const posts = ref([])
const loading = ref(true)
// Ladda de 10 senaste posterna
onMounted(() => {
  loading.value = true
  APIService.get('posts').then((response) => {
    posts.value = response
    loading.value = false
  })
})

//  Todo
// Implementera "continous scroll"
</script>

<template>
  <h1>Posts</h1>
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

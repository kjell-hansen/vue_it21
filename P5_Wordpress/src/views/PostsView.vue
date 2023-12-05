<script setup>
/**
 * Vy för att visa alla inlägg i API:et
 */
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

const posts = ref([])

// Ladda de 10 senaste posterna
onMounted(() => {
  APIService.get('posts').then((response) => {
    posts.value = response
  })
})

//  Todo
// Implementera "continous scroll"
</script>

<template>
  <h1>Posts</h1>
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

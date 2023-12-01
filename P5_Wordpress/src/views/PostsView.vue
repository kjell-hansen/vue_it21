<script setup>
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

const posts = ref([])

onMounted(() => {
  APIService.get('posts').then((response) => {
    posts.value = response
  })
})
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

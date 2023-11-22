<script setup>
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'

const authors = ref([])

onMounted(() => {
  APIService.get('users').then((response) => {
    response.map((auth) => {
      APIService.head('posts?author=' + auth.id).then((head) => {
        auth.postCount = head.get('X-WP-Total')
        authors.value.push(auth)
        authors.value.sort((a, b) => {
          return a.id > b.id ? 1 : -1
        })
      })
    })
  })
})
</script>

<template>
  <main>
    <h1>Authors</h1>
    <div
      v-for="auth in authors"
      :key="auth"
      @click="$router.push('/Author/' + auth.slug)"
      class="excerpt"
    >
      <h2>{{ auth.name }}</h2>
      <p>
        <span class="intense">id:</span>&nbsp;<span>{{ auth.id }}</span>
      </p>
      <p>
        <span class="intense">postCount:</span>&nbsp;<span>{{ auth.postCount }}</span>
      </p>
      <hr />
    </div>
  </main>
</template>
<style scoped>
.intense {
  font-weight: bold;
  text-decoration: underline;
}
.excerpt {
  cursor: pointer;
}
</style>

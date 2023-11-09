<script setup>
import { onMounted, ref } from 'vue'
import router from '../router'
import APIService from '../services/APIService.js'

const categories = ref([])

onMounted(() => {
  APIService.get('categories').then((data) => {
    let apiCalls = []
    for (const itm of data) {
      apiCalls.push(APIService.get('categories/' + itm.id))
    }
    Promise.all(apiCalls).then((values) => {
      for (let index in data) {
        data[index].postCount = values[index].count
      }
      categories.value = data
    })
  })
})
</script>

<template>
  <h1>Categories</h1>
  <main>
    <div v-for="itm in categories" :key="itm" @click="router.push('Category/' + itm.slug)">
      <h2>{{ itm.name }}</h2>
      <p>
        Antal poster: <span class="">{{ itm.postCount }}</span
        ><br />
        {{ itm.description }}
      </p>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
div {
  margin: 0.5em;
  border: 2px solid lightgray;
  border-radius: 10%;
  background-color: bisque;
  padding: 0.5em;
}
</style>

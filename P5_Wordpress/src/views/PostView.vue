<script setup>
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

const props = defineProps(['slug'])
const post = ref({})

const loaded = ref(false)

onMounted(() => {
  APIService.get('posts?slug=' + props.slug).then((response) => {
    post.value = response[0]
    loaded.value = true
  })
})
</script>

<template>
  <main v-if="loaded">
    <PostItem :postitem="post" />
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

<script setup>
import { computed, onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import { useTagsStore } from '../stores/TagsStore'
import PostItem from '../components/PostItem.vue'

const props = defineProps(['slug'])
const tagStore = useTagsStore()
const tags = computed(() => {
  return tagStore.tags
})
const posts = ref([])

onMounted(() => {
  APIService.get('posts?tags=' + tags.value.find((itm) => itm.slug === props.slug)?.id ?? 1).then(
    (response) => {
      posts.value = response.map((itm) => {
        let d = new Date(itm.date)
        itm.date = d.toLocaleDateString()
        return itm
      })
    }
  )
})
</script>

<template>
  <h1>Tag: {{ tags.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
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

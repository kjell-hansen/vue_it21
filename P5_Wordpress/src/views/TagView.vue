<script setup>
/**
 * Vy för att visa alla inlägg för en viss tagg
 */
import { computed, onMounted, ref, watch } from 'vue'
import APIService from '../services/APIService'
import { useTagsStore } from '../stores/TagsStore'
import PostItem from '../components/PostItem.vue'

// Information om vilken tagg som ska visas kommer via props
const props = defineProps(['slug'])

// Ladda metadata om alla taggar via Storen
const tagStore = useTagsStore()
const tags = computed(() => {
  return tagStore.tags
})

const posts = ref([])
const loading = ref(true)

// Bevaka om taggen ändras
watch(props, async (newProp) => {
  getPost(newProp.slug)
})
onMounted(() => {
  getPost(props.slug)
})

/**
 * Hämta alla poster för en viss tagg från API:et
 * @param {*} slug
 */
function getPost(slug) {
  loading.value = true
  APIService.get('posts?tags=' + tags.value.find((itm) => itm.slug === slug)?.id ?? 1).then(
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
  <h1>Tag: {{ tags.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
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

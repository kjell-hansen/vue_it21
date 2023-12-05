<script setup>
/**
 * Vy för visning av poster för en viss kategori
 */
import { computed, onMounted, ref, watch } from 'vue'
import APIService from '../services/APIService'
import { useCategoriesStore } from '../stores/CategoriesStore'
import PostItem from '../components/PostItem.vue'

// Information om vilken kategori kommer via en props
const props = defineProps(['slug'])

// Hämta metadata om kategorierna från storen
const catStore = useCategoriesStore()
const categories = computed(() => {
  return catStore.categories
})
const posts = ref([])
const loading = ref(true)

// Bevaka om kategorin ändras
watch(props, async (newProp) => {
  getPost(newProp.slug)
})
onMounted(() => {
  getPost(props.slug)
})

/**
 * Hämta poster från API:et i angiven kategori
 * @param {*} slug Kategorins slug
 */
function getPost(slug) {
  loading.value = true
  APIService.get('posts?categories=' + categories.value.find((itm) => itm.slug === slug)?.id).then(
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
  <h1>Category: {{ categories.find((cat) => cat.slug === props.slug)?.name ?? props.slug }}</h1>
  <main v-if="!loading">
    <div v-for="itm in posts" :key="itm" class="posts">
      <PostItem :postitem="itm" />
    </div>
  </main>
  <main v-else>
    <img alt="loading" src="@/assets/ox2-flow.gif" width="125" />
  </main>
</template>
<style scoped>
.posts:nth-child(odd) {
  background-color: beige;
}
</style>

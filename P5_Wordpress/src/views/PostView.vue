<script setup>
/**
 * Vy för att visa upp informationen i ett visst inlägg
 */
import { onMounted, ref } from 'vue'
import APIService from '../services/APIService'
import PostItem from '../components/PostItem.vue'

// Inläggets slug kommer som en prop
const props = defineProps(['slug'])
const post = ref({})

// Visa en splash tills sidan är laddad
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
  <main v-else class="loading">
    <img alt="loading" src="@/assets/ox2-flow.gif" width="125" />
  </main>
</template>
<style scoped>
.intense {
  font-weight: bold;
  text-decoration: underline;
}
</style>

<script setup>
import { computed } from 'vue'
import { useAuthorsStore } from '../stores/AuthorsStore'

const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
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

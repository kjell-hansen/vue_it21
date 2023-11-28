<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useCategoriesStore } from './stores/CategoriesStore'
import { onMounted, ref } from 'vue'
import { useAuthorsStore } from './stores/AuthorsStore'

const categoriesStore = useCategoriesStore()
const authorsStore = useAuthorsStore()
const loading = ref(true)
onMounted(() => {
  let req = []
  req.push(categoriesStore.fetchCategories())
  req.push(authorsStore.fetchAuthors())
  Promise.all(req).then(() => {
    loading.value = false
  })
})
</script>

<template>
  <div v-if="loading" class="loading">
    <img alt="loading" src="@/assets/ox2-flow.gif" width="125" />
  </div>
  <header v-if="!loading">
    <img
      alt="OX2logo"
      class="logo"
      src="@/assets/logo.png"
      width="125"
      height="125"
      @click="
        () => {
          $router.push('/')
        }
      "
    />

    <div v-if="!loading" class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/Categories">Categories</RouterLink>
        <RouterLink to="/Posts">Posts</RouterLink>
        <RouterLink to="/Authors">Authors</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView v-if="!loading" />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  cursor: pointer;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
.loading {
  display: flex;
  height: 70vh;
  justify-content: center;
  align-items: center;
}
</style>

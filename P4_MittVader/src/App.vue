<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <h1>Kjells väder</h1>
  <p>När Kjell ger väder lyssnar man</p>
  <RouterView />
</template>

<style scoped>
h1,
p {
  text-align: center;
}
</style>

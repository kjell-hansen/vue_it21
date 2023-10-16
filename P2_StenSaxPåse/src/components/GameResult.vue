<script setup>
import { ref } from 'vue'

const userScore = ref(0)
const computerScore = ref(0)
</script>

<template>
  <span id="userScore">
    <span class="score"> {{ userScore }} </span>
    <p>User</p>
  </span>
  <span id="computerScore">
    <span class="score">{{ computerScore }}</span>
    <p>Computer</p>
  </span>
</template>

<style scoped>
.score {
  background-color: aquamarine;
  font-size: 3em;
}
</style>

<script setup>
const props = defineProps(['userAlternative', 'computerAlternative', 'winnerInfo'])
</script>

<template>
  <div v-if="props.winnerInfo !== ''" id="result">
    <p>Du valde {{ props.userAlternative }}</p>
    <p>Jag valde {{ props.computerAlternative }}</p>
    <p>{{ props.winnerInfo }}</p>
  </div>
</template>

<style scoped>
#result p {
  margin: auto;
  padding: 0.5em;
  width: 50%;
  background-color: aqua;
}
</style>

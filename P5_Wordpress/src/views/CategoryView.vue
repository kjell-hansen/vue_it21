<script setup>
const props = defineProps(['slug'])
</script>

<template>
  <main>Category: {{ props.slug }}</main>
</template>

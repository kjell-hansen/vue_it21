<script setup>
import { computed, onMounted, ref } from 'vue'
import router from '../router'
import { useTagsStore } from '../stores/TagsStore'

const tagStore = useTagsStore()
const tags = computed(() => {
  return tagStore.tags
})
const showTags = ref([])
onMounted(() => {
  tags.value.sort((a, b) => {
    return a.count < b.count ? 1 : -1
  })
  showTags.value = tags.value.slice(0, 100)
  showTags.value.sort((a, b) => {
    return a.name < b.name ? 1 : -1
  })
  showTags.value.sort(() => Math.random() - 0.5)
})
</script>

<template>
  <h1>Tags</h1>
  <main>
    <div class="cloud">
      <template v-for="itm in showTags" :key="itm"
        ><span
          @click="router.push('Tag/' + itm.slug)"
          :style="{ 'font-size': 9 + itm.count * 1 + 'px' }"
          :title="itm.count + ' poster'"
          >{{ itm.name }}</span
        >&nbsp;
      </template>
    </div>
  </main>
</template>

<style scoped>
.cloud {
  margin: 0.5em;
  border: 2px solid lightgray;
  border-radius: 10%;
  background-color: bisque;
  padding: 0.5em;
  text-align: center;
}
span {
  white-space: nowrap;
}
</style>

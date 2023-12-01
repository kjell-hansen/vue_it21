<script setup>
import { computed } from 'vue'
import router from '../router'
import { useCategoriesStore } from '../stores/CategoriesStore'
import { useAuthorsStore } from '../stores/AuthorsStore'
import { useTagsStore } from '../stores/TagsStore'

const props = defineProps(['postitem'])
const authorsStore = useAuthorsStore()
const authors = computed(() => {
  return authorsStore.authors
})
const catStore = useCategoriesStore()
const categories = computed(() => {
  return catStore.categories
})
const tagStore = useTagsStore()
const tags = computed(() => {
  return tagStore.tags
})
</script>
<template>
  <h2>
    {{ props.postitem.title.rendered }}
  </h2>
  <p class="date">
    {{ props.postitem.modified?.substr(0, 10) }} {{ props.postitem.modified?.substr(11) }}
  </p>
  <p
    v-html="props.postitem?.excerpt.rendered"
    @click="router.push('/Post/' + props.postitem.slug)"
    class="excerpt"
  />
  <p>
    <span class="intense">Författare:</span>&nbsp;
    <a
      v-if="
        authors.find((aut) => {
          return aut.id === props.postitem.author
        })
      "
      :href="'/Author/' + authors.find((aut) => aut.id === props.postitem.author).slug"
      >{{
        authors.find((aut) => {
          return aut.id === props.postitem.author
        })?.name ?? props.postitem.author
      }}
    </a>
  </p>
  <p>
    <span class="intense">Kategorier:</span>&nbsp;
    <span v-for="cat in props.postitem.categories" :key="cat">
      <a
        v-if="categories.find((itm) => itm.id === cat)"
        :href="categories.find((itm) => itm.id === cat)?.slug ?? ''"
        >{{ categories.find((itm) => itm.id === cat)?.name ?? '' }}</a
      >&nbsp;
    </span>
  </p>
  <p>
    <span class="intense">Tags:</span>&nbsp;
    <span v-for="tag in props.postitem.tags" :key="tag"
      >{{ tags.find((itm) => itm.id === tag)?.name + ' ' ?? tag + ' ' }}
    </span>
  </p>
</template>
<style scoped>
.intense {
  font-weight: bold;
  text-decoration: underline;
}
.date {
  margin-right: 2em;
  font-style: italic;
}
.excerpt {
  cursor: pointer;
}
</style>

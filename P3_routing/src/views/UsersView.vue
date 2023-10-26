<script setup>
import { onMounted, ref } from 'vue'

import router from '../router'

const props = defineProps(['name'])
const klassen = ref([
  { namn: 'aron', img: 'aron.jfif' },
  { namn: 'casper', img: 'casper.jfif' },
  { namn: 'cipi', img: 'cipi.jfif' },
  { namn: 'daniel', img: 'cipi.jfif' },
  { namn: 'eliasg', img: 'eliasg.jfif' },
  { namn: 'eliasm', img: 'eliasm.jfif' },
  { namn: 'emil', img: 'emil.jfif' },
  { namn: 'flavius', img: 'flavius.jfif' },
  { namn: 'lucas', img: 'lucas.jfif' },
  { namn: 'maria', img: 'maria.jfif' },
  { namn: 'melvin', img: 'melvin.jfif' },
  { namn: 'oliver', img: 'oliver.jfif' },
  { namn: 'ronja', img: 'ronja.jfif' },
  { namn: 'teo', img: 'teo.jfif' }
])
const user = ref({})
onMounted(() => {
  user.value = klassen.value.find((itm) => {
    return itm.namn.toLocaleLowerCase() == props.name.toLocaleLowerCase()
  })
  if (!user.value) {
    router.push('/NoShow')
    return
  }
  document.title = user.value.namn
})

function getImage(img) {
  return img ? '/src/assets/it21/' + img : ''
}
</script>

<template>
  <h1>User page</h1>
  <p>Användaren kallar sig... {{ user.namn }}</p>
  <img :src="getImage(user.img)" :alt="user.namn" />
</template>

<style scoped>
p {
  font-family: 'Comic Sans';
}
</style>

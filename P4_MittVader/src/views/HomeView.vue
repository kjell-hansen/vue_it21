<script setup>
import { ref, onMounted } from 'vue'

const weatherAPI = ref(
  'https://api.open-meteo.com/v1/forecast?latitude=60.0973&longitude=19.9348&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto'
)

onMounted(() => {
  fetch(weatherAPI.value)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      }
    })
    .then((data) => {
      if (data.length === 0) {
        throw 'Ingen data returnerades'
      }
      console.log('Hurra!', data)
    })
})
</script>
<template>
  <p>HomeView</p>
</template>

<style scoped></style>

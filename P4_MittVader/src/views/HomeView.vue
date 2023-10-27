<script setup>
import { ref, onMounted } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'

const weatherAPI = ref(
  'https://api.open-meteo.com/v1/forecast?latitude=60.0973&longitude=19.9348&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant&windspeed_unit=ms&timezone=auto'
)
const weatherInfo = ref([])
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
      weatherInfo.value = []
      let items = data.daily.time.length
      for (let index = 0; index < items; index++) {
        let wd = {}
        wd.date = data.daily.time[index]
        wd.weatherCondition = data.daily.weathercode[index]
        wd.maxTemp = data.daily.temperature_2m_max[index]
        wd.minTemp = data.daily.temperature_2m_min[index]
        wd.precipitation = data.daily.precipitation_sum[index]
        wd.windDirection = data.daily.winddirection_10m_dominant[index]
        wd.windSpeed = data.daily.windspeed_10m_max[index]
        weatherInfo.value.push(wd)
      }
      console.log('Hurra!!', weatherInfo)
    })
})
</script>
<template>
  <div>
    <WeatherCard v-for="day in weatherInfo" :key="day" :weather-data="day" />
  </div>
</template>

<style scoped>
div {
  overflow: auto;
}
</style>

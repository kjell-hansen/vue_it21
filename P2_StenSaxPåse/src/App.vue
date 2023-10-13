<script setup>
import { ref } from 'vue'
import GameAlternatives from './components/GameAlternatives.vue'
import GameScore from './components/GameScore.vue'

const alternative = ref('')
const compAlternative = ref('')
const winnerInfo = ref('')

function setWinnerInfo(winner) {
  if (winner === 'draw') {
    winnerInfo.value = "It's a draw!"
  } else if (winner === 'user') {
    winnerInfo.value = 'Du vann, du fuskade säkert :('
  } else {
    winnerInfo.value = 'Än en gång besegrade maskinen människan!'
  }
}
function setUserAlternative(alt) {
  alternative.value = alt
}
function setComputerAlternative(alt) {
  compAlternative.value = alt
}
</script>

<template>
  <h1>Sten Sax Påse</h1>
  <GameAlternatives
    @user-choice="setUserAlternative"
    @computer-choice="setComputerAlternative"
    @winner="setWinnerInfo"
  />
  <GameScore
    :user-alternative="alternative"
    :computer-alternative="compAlternative"
    :winner-info="winnerInfo"
  />
</template>

<style scoped>
h1 {
  text-align: center;
  min-width: 10px;
}
</style>

<script setup>
import { ref } from 'vue'
import GameAlternatives from './components/GameAlternatives.vue'
import GameScore from './components/GameScore.vue'
import GameResult from './components/GameResult.vue'

const alternative = ref('')
const compAlternative = ref('')
const winnerInfo = ref('')
const winner = ref('')
const round = ref(0) // Vi behöver räkna omgångarna

function setWinnerInfo(_winner) {
  winner.value = _winner
  round.value++ // Öka räknaren för omgång
  if (_winner === 'draw') {
    winnerInfo.value = "It's a draw!"
  } else if (_winner === 'user') {
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
  <GameResult :result="{ round, winner }" />
</template>

<style scoped>
h1 {
  text-align: center;
  min-width: 10px;
}
</style>

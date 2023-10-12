<script setup>
import { ref } from 'vue'

const gameFinished = ref(false)
const alternative = ref('')
const compAlternative = ref('')
const winnerInfo = ref('')
const alternatives = ref(['Sten', 'Sax', 'Påse'])

function alternativeChosen(e) {
  if (gameFinished.value) {
    return
  }
  alternative.value = e.target.innerText
  e.target.classList.add('vald')
  compAlternative.value = alternatives.value[Math.floor(Math.random() * alternatives.value.length)]
  setWinnerInfo(alternative.value, compAlternative.value)
  gameFinished.value = true
}
function resetGame() {
  gameFinished.value = false
  let buttons = document.getElementsByClassName('button')
  for (let b of buttons) {
    b.classList.remove('vald')
  }
}
function setWinnerInfo(player, computer) {
  let p = alternatives.value.indexOf(player)
  let c = alternatives.value.indexOf(computer)
  if (p === c) {
    winnerInfo.value = "It's a draw!"
  } else if ((p + 1) % alternatives.value.length === c) {
    winnerInfo.value = 'Du vann, du fuskade säkert :('
  } else {
    winnerInfo.value = 'Än en gång besegrade maskinen människan!'
  }
}
</script>

<template>
  <h1>Sten Sax Påse</h1>
  <ul>
    <li v-for="alt in alternatives" @click="alternativeChosen" class="button">{{ alt }}</li>
  </ul>
  <p v-if="!gameFinished">Ready to play</p>
  <div v-else id="result">
    <p>Du valde {{ alternative }}</p>
    <p>Jag valde {{ compAlternative }}</p>
    <p>{{ winnerInfo }}</p>
    <button @click="resetGame">Play again!</button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
  min-width: 10px;
}
ul {
  display: flex;
}
li {
  list-style-type: none;
  margin: 0.5em;
  background-color: lightblue;
  padding: 1em;
  border: 2px solid blue;
  border-radius: 0.5em;
}
#result button {
  margin: auto;
  display: block;
  min-width: 10px;
  margin-top: 1em;
}
#result p {
  margin: auto;
  padding: 0.5em;
  width: 50%;
  background-color: aqua;
}
.vald {
  background-color: pink;
  border-color: red;
}
</style>

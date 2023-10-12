<script setup>
import { ref } from 'vue'

const gameFinished = ref(false)
const alternative = ref('')

function alternativeChosen(e) {
  if (gameFinished.value) {
    return
  }
  alternative.value = e.target.innerText
  e.target.classList.add('vald')
  gameFinished.value = true
}
function resetGame() {
  gameFinished.value = false
  let buttons = document.getElementsByClassName('button')
  for (let b of buttons) {
    b.classList.remove('vald')
  }
}
</script>

<template>
  <h1>Sten Sax Påse</h1>
  <ul>
    <li @click="alternativeChosen" class="button">Sten</li>
    <li @click="alternativeChosen" class="button">Sax</li>
    <li @click="alternativeChosen" class="button">Påse</li>
  </ul>
  <p v-if="!gameFinished">Ready to play</p>
  <div v-else id="result">
    <p>Du valde {{ alternative }}</p>
    <p>Jag valde Sten</p>
    <p>Computer wins!</p>
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

<script setup>
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['user-choice', 'computer-choice', 'winner'])
const alternatives = ref(['Scissors', 'Paper', 'Rock', 'Lizard', 'Spock'])

function alternativeChosen(e) {
  let buttons = document.getElementsByClassName('button')
  for (let b of buttons) {
    b.classList.remove('vald')
  }
  let alternative = e.target.innerText
  e.target.classList.add('vald')
  emit('user-choice', alternative)
  computerAction()
}

function computerAction() {
  let compAlternative = alternatives.value[Math.floor(Math.random() * alternatives.value.length)]
  let buttons = document.getElementsByClassName('button')
  for (let b of buttons) {
    b.classList.remove('computerChoice')
    if (b.innerText === compAlternative) {
      b.classList.add('computerChoice')
    }
  }
  emit('computer-choice', compAlternative)
  determineWinner()
}
function determineWinner() {
  let userButton, computerButton
  let buttons = document.getElementsByClassName('button')
  for (let b of buttons) {
    if (b.classList.contains('vald')) {
      userButton = b.innerText
    }
    if (b.classList.contains('computerChoice')) {
      computerButton = b.innerText
    }
  }

  let computerIndex = alternatives.value.indexOf(computerButton)
  let userIndex = alternatives.value.indexOf(userButton)
  if (computerIndex === userIndex) {
    emit('winner', 'draw')
  } else if (computerIndex % 2 === userIndex % 2) {
    emit('winner', computerIndex > userIndex ? 'computer' : 'user')
  } else {
    emit('winner', computerIndex < userIndex ? 'computer' : 'user')
  }
}
</script>

<template>
  <ul>
    <li v-for="alt in alternatives" @click="alternativeChosen" class="button" :key="alt">
      {{ alt }}
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  justify-content: center;
  padding-left: 0;
}
li {
  list-style-type: none;
  margin: 0.5em;
  background-color: lightblue;
  padding: 1em;
  border: 2px solid blue;
  border-radius: 0.5em;
}
.vald {
  background-color: pink;
  border-color: red;
}
.computerChoice {
  border: 0.2em dashed green;
}
</style>

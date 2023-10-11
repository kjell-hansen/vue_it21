<script setup>
import { ref } from 'vue'

const item = ref('')
const list = ref([])

function addItem() {
  let listItem = { text: item.value, done: false }
  list.value.push(listItem)
  item.value = ''
}
function radera(listItem) {
  list.value = list.value.filter((obj) => {
    return obj !== listItem
  })
}
</script>

<template>
  <header>
    <h1>Tasklist</h1>
  </header>

  <main>
    <p>
      Uppgift: <input type="text" v-model="item" placeholder="Ange uppgift" />
      <button v-on:click="addItem">Lägg till</button>
    </p>
    <h3 id="todo">Todo...</h3>
    <ul>
      <template v-for="itm in list">
        <li v-if="!itm.done" v-bind:key="itm" class="todoItm" @click="itm.done = !itm.done">
          {{ itm.text }}
        </li>
      </template>
    </ul>
    <h3 id="klart">Klart!</h3>
    <ul>
      <template v-for="itm in list">
        <li v-if="itm.done" v-bind:key="itm" class="todoItm done" @click="itm.done = !itm.done">
          {{ itm.text }} <span title="Radera" @click="radera(itm)">x</span>
        </li>
      </template>
    </ul>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
h1 {
  color: blue;
}
li span {
  display: inline-block;
  position: absolute;
  right: 3em;
  background-color: red;
  color: wheat;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
button {
  margin-left: 0.5em;
}
#todo {
  color: red;
}
.todoItm {
  margin-left: 2em;
  font-weight: bold;
  padding: 0.5em;
  list-style-type: none;
  cursor: pointer;
}
.todoItm:nth-child(odd) {
  background-color: lightblue;
}
.todoItm:nth-child(even) {
  background-color: lightgreen;
}
.done {
  text-decoration: line-through;
}
#klart {
  color: greenyellow;
}
</style>

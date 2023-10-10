<script setup>
function addItem() {
  this.item = ''
}
</script>

<template>
  <header>
    <h1>Tasklist</h1>
  </header>

  <main>
    <p>
      Uppgift: <input type="text" v-bind="item" placeholder="Ange uppgift" />
      <button v-on="addItem">Lägg till</button>
    </p>
    <h3 id="todo">Todo...</h3>
    <h3 id="klart">Klart!</h3>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
h1 {
  color: blue;
}
button {
  margin-left: 0.5em;
}
#todo {
  color: red;
}
#klart {
  color: greenyellow;
}
</style>

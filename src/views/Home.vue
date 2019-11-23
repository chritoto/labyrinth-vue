<template>
  <div id="app">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
export default {
  name: 'app',
  data: {
    message: 'Hello Vue!'
  }
};
</script>

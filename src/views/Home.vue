<template>
  <div class="home">
    <HelloWorld msg="Here in my garage!" />
  </div>
  <div id="app-6">
    <p>{{ message }}</p>
    <input v-model="message">
  </div>
</template>

<script>
el: '#app-6';
  data: {
    message: 'Hello Vue!';
  };
</script>

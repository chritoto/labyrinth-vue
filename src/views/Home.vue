<template>
  <div id="app">
    <form>
      <label>
        New Todo:
        <input v-model="newTodo" type="text" />
        <button type="submit" @click.prevent="addTodo()">Add</button>
      </label>
    </form>
  </div>
</template>

<script>
import { todosCollection } from '../firebase';
export default {
  name: 'app',
  data() {
    return {
      newTodo: ''
    };
  },
  methods: {
    addTodo() {
      todosCollection
        .add({
          text: this.newTodo,
          completed: false,
          createdAt: new Date()
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
      this.newTodo = '';
    }
  }
};
</script>

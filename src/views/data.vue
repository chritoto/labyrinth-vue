<template>
  <div id="data">
    <p>{{ test }}</p>
    <form>
      <label>
        New Todo:
        <input v-model="x" type="text" />
        <input v-model="y" type="text" />
        <button type="submit" @click.prevent="addLocation()">Add</button>
      </label>
    </form>
  </div>
</template>

<script>
import { UserCollection } from '../firebase';
import { getToken } from '../authentication/authTokenTools';
//import { labyrinthbeg } from '../api/labyrinthApi';
import Vue from 'vue';
export default {
  name: 'data',
  data() {
    return {
      x: '',
      y: '',
      test: getToken()
    };
  },
  methods: {
    addLocation() {
      Vue.axios
        .get('https://labyrinth-api.herokuapp.com/maze/beginner')
        .then(result => {
          console.log(result.data);
        });
      UserCollection.doc(getToken())
        .set({
          x: this.x,
          y: this.y
        })
        .then(function(docRef) {
          console.log('Location written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
      this.x = '';
      this.y = '';
    }
  }
};
</script>

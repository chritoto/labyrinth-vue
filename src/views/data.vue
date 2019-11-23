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
      UserCollection.add({
        x: this.x,
        y: this.y,
        createdAt: new Date()
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

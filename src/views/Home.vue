<template>
  <div style="margin-top: 72px;">
    <p><button type="submit" @click.prevent="newgame()">NEW GAME</button></p>
    <p>{{ locx }}</p>
    <p>{{ locy }}</p>
    <b-container>
      <div ref="canvas"></div>
      <b-btn>Change color</b-btn>
    </b-container>
  </div>
</template>

<script>
//import { db } from '../firebase';
import { getToken } from '../authentication/authTokenTools';
import { UserCollection } from '../firebase';
import Vue from 'vue';
export default {
  data: function() {
    return {
      script: null,
      ps: null,
      player: { id: getToken(), pos: { x: 0, y: 0 } },
      locx: 0,
      locy: 0,
      lab: null,
      users: []
    };
  },
  methods: {
    newgame() {
      const vm = this;
      UserCollection.doc('users')
        .get()
        .then(function(doc) {
          vm.users = doc.data()['users'];
        });
      var arrayLength = vm.users.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log(vm.users[i]);
        UserCollection.doc(vm.users[i])
          .delete()
          .then(function() {
            console.log('Document successfully deleted!');
          })
          .catch(function(error) {
            console.error('Error removing document: ', error);
          });
      }
      vm.users = [];
    }
  },
  mounted() {
    const vm = this;
    var level = 'beginner';
    Vue.axios
      .get('https://labyrinth-api.herokuapp.com/maze/' + level)
      .then(function(result) {
        vm.lab = result.data;
      });
    this.script = p => {
      var canvas = null;

      p.setup = _ => {
        canvas = p.createCanvas(600, 420);
        canvas.parent(this.$refs.canvas);
        p.frameRate(30);
        //aller get le labyrinthe
        UserCollection.doc('users')
          .get()
          .then(function(doc) {
            console.log(doc.data()['users']);
            vm.users = doc.data()['users'];
          });
        console.log(vm.users);
        vm.users.push(vm.player.id);
        console.log(vm.users);
        UserCollection.doc('users').set({
          users: vm.users
        });
      };

      //dessinne ICITTT
      p.draw = _ => {
        UserCollection.doc(this.player.id)
          .get()
          .then(function(doc) {
            vm.locx = doc.data()['x'];
            vm.locy = doc.data()['y'];
          });
        p.background(0);
        p.fill(255);
        p.rect(this.player.pos.x, this.player.pos.y, 10, 10);
        var arrayLength = vm.users.length;
        for (var i = 0; i < arrayLength; i++) {
          if (vm.users[i] != this.player.id) {
            UserCollection.doc(vm.users[i])
              .get()
              .then(function(doc) {
                vm.locx = doc.data()['x'];
                vm.locy = doc.data()['y'];
              });
            p.fill(255, 204, 0);
            p.rect(vm.locx, vm.locy, 10, 10);
          }
        }

        UserCollection.doc(this.player.id).set({
          x: this.player.pos.x,
          y: this.player.pos.y
        });
        //les controles pis toutes !
        if (p.keyIsDown(p.LEFT_ARROW)) {
          this.player.pos.x -= 3; //add to server function set position
        } else if (p.keyIsDown(p.RIGHT_ARROW)) {
          this.player.pos.x += 3;
        } else if (p.keyIsDown(p.UP_ARROW)) {
          this.player.pos.y -= 3;
        } else if (p.keyIsDown(p.DOWN_ARROW)) {
          this.player.pos.y += 3;
        }
      };
    };
    const P5 = require('p5');
    this.ps = new P5(this.script);
    console.log(this.ps);
  }
};
</script>

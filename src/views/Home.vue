<template>
  <div style="margin-top: 72px;">
    <b-container>
      <div ref="canvas"></div>
      <b-btn>Change color</b-btn>
    </b-container>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      script: null,
      ps: null,
      player: { pos: { x: 0, y: 0 } }
    };
  },
  mounted() {
    this.script = p => {
      var canvas = null;

      p.setup = _ => {
        canvas = p.createCanvas(600, 420);
        canvas.parent(this.$refs.canvas);
        p.frameRate(60);
        //aller get le labyrinthe
      };

      //dessinne ICITTT
      p.draw = _ => {
        p.background(0);
        p.fill(255);
        p.rect(this.player.pos.x, this.player.pos.y, 10, 10);

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

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
      ps: null
    };
  },
  mounted() {
    this.script = p => {
      var x = 100;
      var y = 100;
      var canvas = null;

      p.setup = _ => {
        canvas = p.createCanvas(600, 420);
        canvas.parent(this.$refs.canvas);
        p.frameRate(60);
      };

      p.draw = _ => {
        p.background(0);
        p.fill(255);
        p.rect(x, y, 50, 50);
      };
    };
    const P5 = require('p5');
    this.ps = new P5(this.script);
    console.log(this.ps);
  }
};
</script>

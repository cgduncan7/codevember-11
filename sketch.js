/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  var rgb;

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    canvas = p5canvas.canvas;
    sketch.frameRate(framerate);
    rgb = new RGB(sketch);
    sketch.background(0);
  }

  sketch.draw = function() {
    sketch.blendMode(sketch.BLEND);
    sketch.background(0, 0, 0, 10);
    rgb.draw();
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));
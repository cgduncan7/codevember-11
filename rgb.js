function RGB(sketch) {
  this.sketch = sketch;
  this.fans = [];
  this.fans.push(new Fan(
    sketch.color(255,0,0,128),
    (Math.random() + 1) / 2 * sketch.width / 4,
    sketch.width / 2,
    sketch.height / 2,
  ));
  
  this.fans.push(new Fan(
    sketch.color(0,255,0,128),
    (Math.random() + 1) / 2 * sketch.width / 4,
    sketch.width / 2,
    sketch.height / 2,
  ));
  
  this.fans.push(new Fan(
    sketch.color(0,0,255,128),
    (Math.random() + 1) / 2 * sketch.width / 4,
    sketch.width / 2,
    sketch.height / 2,
  ));
}

RGB.prototype.draw = function() {
  sketch.blendMode(sketch.SCREEN);
  this.fans.forEach((fan) => {
    fan.update();
    fan.draw(this.sketch);
  });
};

function Fan(color, radius, centerX, centerY) {
  this.color = color;
  this.center = [centerX, centerY];
  this.radius = radius;
  this.step = (Math.random() + 1) / 2;
  this.a0 = Math.random() * Math.PI * 2;
  this.a1 = this.a0 + ((Math.random() + 1) / 2) * Math.PI;
  this.p0 = [
    Math.cos(this.a0) * this.radius + this.center[0],
    Math.sin(this.a0) * this.radius + this.center[1]
  ];
  this.p1 = [
    Math.cos(this.a1) * this.radius + this.center[0],
    Math.sin(this.a1) * this.radius + this.center[1]
  ];
}

Fan.prototype.update = function() {
  this.a0 += this.step;
  this.a1 += this.step;
  this.p0 = [
    Math.cos(this.a0) * this.radius + this.center[0],
    Math.sin(this.a0) * this.radius + this.center[1],
  ];
  this.p1 = [
    Math.cos(this.a1) * this.radius + this.center[0],
    Math.sin(this.a1) * this.radius + this.center[1]
  ];
  this.p2 = [
    Math.cos((this.a1 + this.a0) / 2) * this.radius * 1.3 + this.center[0],
    Math.sin((this.a1 + this.a0) / 2) * this.radius * 1.3 + this.center[1],
  ];
}

Fan.prototype.draw = function(sketch) {
  sketch.stroke(this.color);
  sketch.fill(this.color);
  sketch.beginShape();
  sketch.vertex(this.center[0], this.center[1]);
  // sketch.curveVertex(this.p0[0], this.p0[1]);
  sketch.vertex(this.p0[0], this.p0[1]);
  sketch.quadraticVertex(this.p2[0], this.p2[1], this.p1[0], this.p1[1]);
  // sketch.curveVertex(this.p1[0], this.p1[1]);
  sketch.endShape(sketch.CLOSE);
}
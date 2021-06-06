function Particle(x, y, dur) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(random(0, PI * 2)).mult(dur / 6);
  this.dur = dur;
  this.alpha = 255;

  this.update = function() {
    this.vel.mult(0.9);
    this.pos.add(this.vel);
    this.alpha -= 10;
  };

  this.check = function() {
    if (this.alpha <= 0) {
      particles.splice(particles.indexOf(this), 1);
    }
  };

  this.draw = function() {
    stroke(220, this.alpha);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  };
}

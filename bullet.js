function Bullet(x, y, r) {
  this.pos = createVector(x, y);
  this.vel = p5.Vector.fromAngle(r).mult(10);
  this.r = r;

  this.update = function() {
    this.pos.add(this.vel);
  };

  this.check = function() {
    if (this.pos.x > width / 2) {bullets.splice(bullets.indexOf(this), 1);}
    if (this.pos.x < -width / 2) {bullets.splice(bullets.indexOf(this), 1);}
    if (this.pos.y > height / 2) {bullets.splice(bullets.indexOf(this), 1);}
    if (this.pos.y < -height / 2) {bullets.splice(bullets.indexOf(this), 1);}

    for (let i = 0; i < asteroids.length; i++) {
      if (pythagoras(abs(this.pos.x - asteroids[i].pos.x), abs(this.pos.y - asteroids[i].pos.y)) < asteroids[i].radius) {
        asteroids[i].break(true);
        bullets.splice(bullets.indexOf(this), 1);
        break;
      }
    }
    for (let i = 0; i < powerups.length; i++) {
      if (pythagoras(abs(this.pos.x - powerups[i].pos.x), abs(this.pos.y - powerups[i].pos.y)) < powerups[i].radius) {
        powerups[i].break();
        bullets.splice(bullets.indexOf(this), 1);
        break;
      }
    }
  };

  this.draw = function() {
    stroke(220);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  };
}

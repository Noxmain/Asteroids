function Powerup() {
  this.pos = createVector(random(-width / 2, width / 2), random(-height / 2, height / 2));
  this.radius = 8;

  this.pickup = function() {
    ship.lives++;
    if (SOUND) {assets.heal.play();}
    powerups.splice(powerups.indexOf(this), 1);
  };

  this.break = function() {
    if (SOUND) {assets.explosion.play();}
    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(this.pos.x, this.pos.y, this.radius));
    }
    powerups.splice(powerups.indexOf(this), 1);
  };

  this.draw = function() {
    stroke(220);
    strokeWeight(2);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    line(this.pos.x, this.pos.y - this.radius / 2, this.pos.x, this.pos.y + this.radius / 2);
    line(this.pos.x - this.radius / 2, this.pos.y, this.pos.x + this.radius / 2, this.pos.y);
  };
}

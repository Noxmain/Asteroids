function Ship() {
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.r = -PI / 2;
  this.lives = 3;

  this.move = function() {
    if (keyIsDown(65 /*A*/)) {ship.r -= PI / 64;}
    if (keyIsDown(68 /*D*/)) {ship.r += PI / 64;}
    if (keyIsDown(87 /*W*/)) {ship.vel.add(p5.Vector.fromAngle(this.r).mult(0.1));}
    if (keyIsDown(83 /*S*/)) {ship.vel.add(p5.Vector.fromAngle(this.r).mult(-0.1));}
  };

  this.shoot = function() {
    bullets.push(new Bullet(this.pos.x, this.pos.y, this.r));
    if (SOUND) {assets.shoot.play();}
  };

  this.update = function() {
    this.pos.add(this.vel);
    this.vel.mult(0.99);

    if (this.pos.x > width / 2 + 15) {this.pos.x -= width + 30;}
    if (this.pos.x < -width / 2 - 15) {this.pos.x += width + 30;}
    if (this.pos.y > height / 2 + 15) {this.pos.y -= height + 30;}
    if (this.pos.y < -height / 2 - 15) {this.pos.y += height + 30;}
  };

  this.check = function() {
    for (let i = 0; i < asteroids.length; i++) {
      if (pythagoras(abs(this.pos.x - asteroids[i].pos.x), abs(this.pos.y - asteroids[i].pos.y)) < asteroids[i].radius + 10) {
        this.lives--;
        asteroids[i].break(false);
        for (let i = 0; i < 10; i++) {
          particles.push(new Particle(30 * this.lives + 50 - width / 2, 100 - width / 2, 15));
        }

        if (SOUND) {if (this.lives == 0) {startframes = frames; assets.dead.loop();}}
      }
    }

    for (let i = 0; i < powerups.length; i++) {
      if (pythagoras(abs(this.pos.x - powerups[i].pos.x), abs(this.pos.y - powerups[i].pos.y)) < 18) {
        powerups[i].pickup();
      }
    }
  };

  this.draw = function() {
    let x1 = this.pos.x + cos(this.r) * 15;
    let y1 = this.pos.y + sin(this.r) * 15;
    let x2 = this.pos.x + cos(this.r - PI * 0.8) * 15;
    let y2 = this.pos.y + sin(this.r - PI * 0.8) * 15;
    let x3 = this.pos.x + cos(this.r + PI * 0.8) * 15;
    let y3 = this.pos.y + sin(this.r + PI * 0.8) * 15;
    let x4 = this.pos.x + cos(this.r - PI * 0.8) * 10;
    let y4 = this.pos.y + sin(this.r - PI * 0.8) * 10;
    let x5 = this.pos.x + cos(this.r + PI * 0.8) * 10;
    let y5 = this.pos.y + sin(this.r + PI * 0.8) * 10;
    if (this.lives > 0) {
      stroke(220);
    } else {
      stroke(sin(frames / 10) * 100 + 120);
    }
    strokeWeight(2);
    line(x1, y1, x2, y2);
    line(x1, y1, x3, y3);
    line(x4, y4, x5, y5);

    for (let i = 0; i < this.lives; i++) {
      let x1 = 30 * i + 50 - width / 2 + cos(-PI / 2) * 15;
      let y1 = 100 - width / 2 + sin(-PI / 2) * 15;
      let x2 = 30 * i + 50 - width / 2 + cos(-PI / 2 - PI * 0.8) * 15;
      let y2 = 100 - width / 2 + sin(-PI / 2 - PI * 0.8) * 15;
      let x3 = 30 * i + 50 - width / 2 + cos(-PI / 2 + PI * 0.8) * 15;
      let y3 = 100 - width / 2 + sin(-PI / 2 + PI * 0.8) * 15;
      let x4 = 30 * i + 50 - width / 2 + cos(-PI / 2 - PI * 0.8) * 10;
      let y4 = 100 - width / 2 + sin(-PI / 2 - PI * 0.8) * 10;
      let x5 = 30 * i + 50 - width / 2 + cos(-PI / 2 + PI * 0.8) * 10;
      let y5 = 100 - width / 2 + sin(-PI / 2 + PI * 0.8) * 10;
      line(x1, y1, x2, y2);
      line(x1, y1, x3, y3);
      line(x4, y4, x5, y5);
    }
  };
}

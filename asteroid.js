function Asteroid() {
  this.radius = Math.pow(2, round(random(3, 5)));
  if (random() < 0.5) {
    let x = random(-width / 2, width / 2);
    let y = (height / 2 + this.radius) * (round(random()) * 2 - 1);
    this.pos = createVector(x, y);
  } else {
    let x = (width / 2 + this.radius) * (round(random()) * 2 - 1);
    let y = random(-height / 2, height / 2);
    this.pos = createVector(x, y);
  }
  this.vel = p5.Vector.fromAngle(random(0, PI * 2));

  this.vertices = [];
  for (let i = 0; i < PI * 2; i += PI / 4) {
    let l = [];
    l[0] = cos(i) * (this.radius + random(-this.radius / 5, this.radius / 5));
    l[1] = sin(i) * (this.radius + random(-this.radius / 5, this.radius / 5));
    this.vertices.push(l);
  }

  this.break = function(increase_score) {
    if (increase_score) {
      if (this.radius == 8) {score += 5;} else
      if (this.radius == 16) {score += 4;} else
      if (this.radius == 32) {score += 3;} else
      {score += 1;}
    }

    for (let i = 0; i < 10; i++) {
      particles.push(new Particle(this.pos.x, this.pos.y, this.radius));
    }
    asteroids.splice(asteroids.indexOf(this), 1);
  };

  this.update = function() {
    this.pos.add(this.vel);
  };

  this.check = function() {
    if (this.pos.x > width / 2 + this.radius) {asteroids.splice(asteroids.indexOf(this), 1);}
    if (this.pos.x < -width / 2 - this.radius) {asteroids.splice(asteroids.indexOf(this), 1);}
    if (this.pos.y > height / 2 + this.radius) {asteroids.splice(asteroids.indexOf(this), 1);}
    if (this.pos.y < -height / 2 - this.radius) {asteroids.splice(asteroids.indexOf(this), 1);}
  };

  this.draw = function() {
    stroke(220);
    strokeWeight(2);
    noFill();
    // ellipse(this.pos.x, this.pos.y, this.radius * 2);
    beginShape();
    for (let i = 0; i < this.vertices.length; i++) {
      vertex(this.pos.x + this.vertices[i][0], this.pos.y + this.vertices[i][1]);
    }
    endShape(CLOSE);
  };
}

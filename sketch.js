let ship;
let bullets = [];
let asteroids = [];
let powerups = [];
let particles = [];
let score = 0;
let frames = 0;
let startframes;
let reset_score = false;
let reset_lives = false;
let assets = {};

function preload() {
  // soundFormats("wav");
  assets.shoot = loadSound("assets/shoot.wav");
  assets.explosion = loadSound("assets/explosion.wav");
  assets.hurt = loadSound("assets/hurt.wav");
  assets.heal = loadSound("assets/heal.wav");
  assets.dead = loadSound("assets/dead.wav");
  assets.restart = loadSound("assets/restart.wav");
}

function pythagoras(a, b) {
  return Math.sqrt(a * a + b * b);
}

function setup() {
  createCanvas(600, 600);
  ship = new Ship();

  assets.shoot.setVolume(0.3);
  assets.explosion.setVolume(0.5);
  assets.hurt.setVolume(0.6);
  assets.heal.setVolume(0.5);
  assets.dead.setVolume(0.2);
  assets.restart.setVolume(0.5);
}

function draw() {
  frames++;
  background(5);
  translate(width / 2, height / 2);

  if (ship.lives > 0) {
    ship.move();
    ship.check();
  }
  ship.update();
  ship.draw();

  for (let i = 0; i < bullets.length; i++) {bullets[i].update();}
  for (let i = 0; i < bullets.length; i++) {bullets[i].check();}
  for (let i = 0; i < bullets.length; i++) {bullets[i].draw();}

  if (random() < 0.03 + frames / 300000) {asteroids.push(new Asteroid());}
  for (let i = 0; i < asteroids.length; i++) {asteroids[i].update();}
  for (let i = 0; i < asteroids.length; i++) {asteroids[i].check();}
  for (let i = 0; i < asteroids.length; i++) {asteroids[i].draw();}

  if (random() < 0.00001 + frames / 30000000) {powerups.push(new Powerup());}
  for (let i = 0; i < powerups.length; i++) {powerups[i].draw();}

  for (let i = 0; i < particles.length; i++) {particles[i].update();}
  for (let i = 0; i < particles.length; i++) {particles[i].check();}
  for (let i = 0; i < particles.length; i++) {particles[i].draw();}

  noStroke();
  fill(220);
  textFont("Courier New");
  textAlign(LEFT, CENTER);
  textSize(40);
  text(score, 38 - width / 2, 50 - height / 2);

  if (reset_score) {
    if (score > 10) {score -= 10;} else {score = 0; reset_score = false;}
  }
  if ((reset_lives) && (frames % 10 == 0)) {
    if (ship.lives < 3) {ship.lives++;} else {reset_lives = false;}
  }
}

function keyPressed() {
  if (key == " ") {
    if (ship.lives > 0) {
      ship.shoot();
    } else if (frames > startframes + 100) {
      assets.dead.stop();
      assets.restart.play();
      startframes = undefined;
      reset_score = true;
      reset_lives = true;

      for (let i = 0; i < asteroids.length; i++) {
        for (let j = 0; j < 10; j++) {
          particles.push(new Particle(asteroids[i].pos.x, asteroids[i].pos.y, asteroids[i].radius));
        }
      }
      asteroids = [];
      powerups = [];
      bullets = [];
      frames = 0;
    }
  }
}

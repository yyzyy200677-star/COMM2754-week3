let beat;
let analyzer;
let stars = [];
let angle = 0;

function preload() {
  beat = loadSound('beat.mp3');
}

function setup() {
  createCanvas(700, 500);

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);

  for (let i = 0; i < 110; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 4),
      speed: random(0.15, 0.7),
      brightness: random(120, 255)
    });
  }
}

function draw() {
  background(18, 12, 42);

  let level = analyzer.getLevel();

  drawStars(level);

  let centerX = width / 2;
  let centerY = height / 2 - 20;

  drawRings(centerX, centerY, level);
  drawPlanet(centerX, centerY, level);
  drawMoon(centerX, centerY, level);

  angle += 0.004 + level * 0.012;
}

function drawStars(level) {
  for (let star of stars) {
    star.y += star.speed;

    if (star.y > height) {
      star.y = 0;
      star.x = random(width);
    }

    noStroke();

    fill(
      star.brightness,
      star.brightness,
      255,
      170
    );

    circle(
      star.x,
      star.y,
      star.size + level * 3
    );
  }
}

function drawRings(centerX, centerY, level) {
  push();

  translate(centerX, centerY);
  rotate(angle);

  noFill();
  strokeWeight(3);

  stroke(180, 120, 255, 130);
  ellipse(
    0,
    0,
    225 + level * 160,
    150 + level * 90
  );

  stroke(100, 180, 255, 120);
  ellipse(
    0,
    0,
    180 + level * 140,
    120 + level * 75
  );

  stroke(255, 120, 200, 115);
  ellipse(
    0,
    0,
    140 + level * 110,
    92 + level * 55
  );

  pop();
}

function drawPlanet(centerX, centerY, level) {
  noStroke();

  fill(80, 45, 170, 100);
  circle(
    centerX + 8,
    centerY + 8,
    92 + level * 150
  );

  fill(125, 75, 220);
  circle(
    centerX,
    centerY,
    82 + level * 155
  );

  fill(185, 145, 255, 140);
  circle(
    centerX - 17,
    centerY - 17,
    30 + level * 42
  );

  fill(230, 210, 255, 70);
  circle(
    centerX - 25,
    centerY - 25,
    12 + level * 20
  );
}

function drawMoon(centerX, centerY, level) {
  let orbitX = 122;
  let orbitY = 66;

  let moonX = centerX + cos(angle * 3) * orbitX;
  let moonY = centerY + sin(angle * 3) * orbitY;

  noStroke();

  fill(255, 175, 220, 70);
  circle(
    moonX,
    moonY,
    24 + level * 20
  );

  fill(255, 205, 235);
  circle(
    moonX,
    moonY,
    16 + level * 18
  );
}

function mousePressed() {
  if (beat.isPlaying()) {
    beat.pause();
  } else {
    beat.loop();
  }
}
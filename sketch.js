let beat;
let analyzer;

function preload() {
  beat = loadSound('beat.mp3');
}

function setup() {
  let myCanvas = createCanvas(600, 400);
  myCanvas.parent('myContainer');

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);
}

function mousePressed() {
  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}

function draw() {
  background(230);

  let rms = 0;

  if (analyzer.getLevel()) {
    rms = analyzer.getLevel();
  }

  fill(127);
  stroke(0);

  ellipse(
    width / 2,
    height / 2,
    10 + rms * 200,
    10 + rms * 200
  );
}

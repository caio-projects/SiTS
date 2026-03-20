let turbine;
let cam;

function preload() {
  teapot = loadModel('.././models/turbine.obj', true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
}

function draw() {
  background(100);
  strokeWeight(0.1);
  orbitControl();
  rotateX(frameCount * 0.0006);
  fill(255, 255, 255);
  model(teapot);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
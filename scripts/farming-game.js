// Tasks:
// Resize background
import { Player } from "./player.js";
import { Garden } from "./garden.js";
let sketch = new p5();
let grass;
let farmerGraphicTest;

function preload() {
  grass = loadImage("assets/grass.png");
  farmerGraphicTest = [
    loadImage("assets/blue-man-running1.png"),
    loadImage("assets/blue-man-running2.png"),
  ];
}

window.preload = preload;

function setup() {
  let canvas = sketch.createCanvas(1280, 720);
  canvas.parent("container");
  background("red");
  image(grass, 0, 0);
}

window.setup = setup;
let index = 0;

let PlayerOne = new Player(500, 500);
function draw() {
  let tiles = new Garden();
  tiles.drawTiles(14, 9, 60);
  
  PlayerOne.animatePlayer(farmerGraphicTest, index);

// -- 
// These two if's are responsible for animations
// Since we decided on having 2 frames for all animations, we can set global index (line 27)
// And them change it twice a frame (this if what following if statemnts do)
  if (frameCount % 15 == 0) {
    index = 0;
}
  if (frameCount % 30 == 0) {
    index = 1;
}
// --
}

window.draw = draw;

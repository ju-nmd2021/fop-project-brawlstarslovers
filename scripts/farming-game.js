// Tasks:
// Resize background
import { Player } from "./player.js";
import { Garden } from "./garden.js";
let sketch = new p5();
let grass;
let animationTopPlayerOne;

function preload() {
  grass = loadImage("assets/grass.png");
  animationTopPlayerOne = [
    loadImage("assets/blue-man-running1.png"),
    loadImage("assets/blue-man-running2.png"),
  ];
}

window.preload = preload;

function setup() {
  let canvas = sketch.createCanvas(1280, 720);
  canvas.parent("container");
  background("red");
}

window.setup = setup;
let index = 0;
// You can see what do these keys stand for in player.js
let PlayerOne = new Player(500, 500, 68, 3, 65, 87, 83);
function draw() {
  image(grass, 0, 0);
  let tiles = new Garden();
  tiles.drawTiles(14, 9, 60);
  PlayerOne.animatePlayer(animationTopPlayerOne, index);
  PlayerOne.movePlayer();

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

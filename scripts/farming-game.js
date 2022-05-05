// Tasks:
// Resize background

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
  //   farmerGraphicTest.resize(160, 160);
  console.log(farmerGraphicTest[1].width);
}

window.setup = setup;

function draw() {
  let tiles = new Garden();
  tiles.drawTiles(14, 9, 60);

  image(farmerGraphicTest[0], mouseX, mouseY);
  ellipse(300, 300, 30);
}

window.draw = draw;

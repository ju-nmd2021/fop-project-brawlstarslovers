// Tasks:
// Resize background
import { Player } from "./player.js";
import { Garden } from "./garden.js";
import { Booster } from "./booster.js";

let sketch = new p5();

let grass;
let strawberry;

let animationTopPlayerOne;
let animationTopPlayerTwo;
let BoosterStrawberry;

function preload() {
  grass = loadImage("assets/grass.png");
  // Initialization of all animations
  animationTopPlayerOne = [
    loadImage("assets/blue-man-running1.png"),
    loadImage("assets/blue-man-running2.png"),
  ];
  animationTopPlayerTwo = [
    loadImage("assets/red-man-run1.png"),
    loadImage("../assets/red-man-run2.png"),
  ];
}

window.preload = preload;


function setup() {
  let canvas = sketch.createCanvas(1280, 720);
  canvas.parent("container");
}
window.setup = setup;
let index = 0;
// You can see what do these keys stand for in player.js
let PlayerOne = new Player(500, 500, 68, 3, 65, 87, 83);
let PlayerTwo = new Player(100, 100, 39, 3, 37, 38, 40);

let BoosterFruit;
setInterval(() => {BoosterFruit = new Booster( 
  Math.floor(Math.random() * (1000 - 100 + 1)) + 100, 720, 'prison', PlayerOne, PlayerTwo);}, 5000);
function draw() {
  
  image(grass, 0, 0);
  let tiles = new Garden();
  tiles.drawTiles(14, 9, 60);

  PlayerOne.animatePlayer(animationTopPlayerOne, index);
  PlayerTwo.animatePlayer(animationTopPlayerTwo, index);
  PlayerTwo.movePlayer();
  PlayerOne.movePlayer();
  PlayerOne.EscapeFromPrison();
  PlayerTwo.EscapeFromPrison();

  if (BoosterFruit) {
  BoosterFruit.createBooster();
  BoosterFruit.checkPlayerCollision(PlayerOne.playerX, PlayerOne.playerY, PlayerOne);
  BoosterFruit.checkPlayerCollision(PlayerTwo.playerX, PlayerTwo.playerY, PlayerTwo);
  }
  // --
  // These two if's are responsible for  all animations
  // Since we decided on having 2 frames for all animations, we can set global index (line 27)
  // And then change it twice a frame (this if what following if statemnts do)

  if (frameCount % 15 == 0) {
    index = 0;
  }
  if (frameCount % 30 == 0) {
    index = 1;
  }
  // --
}

window.draw = draw;

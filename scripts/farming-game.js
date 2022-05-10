// Tasks:
// Resize background
import { Player } from "./player.js";
import { Garden } from "./garden.js";
import { Booster } from "./booster.js";
import { Plant } from "./plant.js";

let sketch = new p5();

let tilesX = 14;
let tilesY = 9;
let tileSize = 60;
let offsetX = (1280 - tilesX * tileSize) / 2;
let offsetY = (720 - tilesY * tileSize) / 2;

let grass;
let randomX = Math.floor(Math.random() * (1000 - 100 + 1));
let boostersList = ["prison", "speed", "booze"];
let priorBooster;
let randomBoost;

let plants = [];
const plantTypes = ["tomato", "potato", "strawberry"];
let setPlantPos = [];

function getRandomBooster() {
  while (randomBoost == priorBooster) {
    randomBoost = boostersList[Math.floor(Math.random() * boostersList.length)];
  }
  priorBooster = randomBoost;
  return randomBoost;
}

function randomTile() {
  let positions = [];
  positions[0] = offsetX + Math.floor(Math.random() * tilesX) * tileSize;
  positions[1] = offsetY + Math.floor(Math.random() * tilesY) * tileSize;
  return positions;
}

function setRandomPlantPos() {
  let newPlantPos = randomTile();
  console.log("X:" + newPlantPos[0] + "    Y:" + newPlantPos[1]);

  for (let i = 0; i < plants.length; i++) {
    if (
      newPlantPos[0] === plants[i].plantX &&
      newPlantPos[1] === plants[i].plantY
    ) {
      newPlantPos = randomTile();
      i = 0; // start over
    }
  }
  return newPlantPos;
}

let animationTopPlayerOne;
let animationTopPlayerTwo;

function preload() {
  grass = loadImage("../assets/grass2.png");
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
// You can see what do these arguments stand for in player.js
let PlayerOne = new Player(500, 500, 68, 3, 65, 87, 83);
let PlayerTwo = new Player(100, 100, 39, 3, 37, 38, 40);

//-----------------------------------------------------------playground plant
console.log(setPlantPos);

plants.push(new Plant(plantTypes[0], 200, 100, PlayerOne, PlayerTwo, tileSize));
setPlantPos = setRandomPlantPos();
plants.push(
  new Plant(
    plantTypes[0],
    setPlantPos[0],
    setPlantPos[1],
    PlayerOne,
    PlayerTwo,
    tileSize
  )
);
// setInterval(() => {
//   testPlant.spawnTimer();
// }, 3000);
// plants[0].spawnTimer();
// plants[1].spawnTimer();
// for (let i = 0; i < plants.length; i++) {
//   plants[i].spawnTimer();
// }

//-----------------------------------------------------------playground plant

let BoosterFruit;
setInterval(() => {
  BoosterFruit = new Booster(
    randomX + 100,
    720,
    getRandomBooster(),
    PlayerOne,
    PlayerTwo
  );
}, 5000);

function draw() {
  image(grass, 0, 0);
  let tiles = new Garden();
  tiles.drawTiles(14, 9, 60);

  randomX = Math.floor(Math.random() * (1000 - 100 + 1));

  tiles.drawTiles(tilesX, tilesY, tileSize);

  for (let i = 0; i < plants.length; i++) {
    plants[i].drawPlant();
  }

  PlayerOne.animatePlayer(animationTopPlayerOne, index);
  PlayerTwo.animatePlayer(animationTopPlayerTwo, index);
  PlayerTwo.movePlayer();
  PlayerOne.movePlayer();
  PlayerOne.EscapeFromPrison();
  PlayerTwo.EscapeFromPrison();

  if (BoosterFruit) {
    BoosterFruit.createBooster();
    BoosterFruit.checkPlayerCollision(
      PlayerOne.playerX,
      PlayerOne.playerY,
      PlayerOne
    );
    BoosterFruit.checkPlayerCollision(
      PlayerTwo.playerX,
      PlayerTwo.playerY,
      PlayerTwo
    );
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

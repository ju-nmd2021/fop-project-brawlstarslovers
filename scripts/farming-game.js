import { Player } from "./player.js";
import { Garden } from "./garden.js";
import { Booster } from "./booster.js";
import { Plant } from "./plant.js";
import { Basket } from "./basket.js";
let gameState = "run";

// Remove scroll on arrows
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

let tilesX = 14;
let tilesY = 9;
let tileSize = 60;
let offsetX = (1280 - tilesX * tileSize) / 2;
let offsetY = (720 - tilesY * tileSize) / 2;

let grass;
let randomX = Math.floor(Math.random() * (1000 - 100 + 1));
let boostersList = ["prison", "speed", "booze", "teleport"];
let priorBooster;
let randomBoost;

let plants = [];
const plantTypes = [{
  plantType: "potato",
  pointValue: 5
}, 
{
  plantType: "carrot",
  pointValue: 10
}, 
{
  plantType: "broccoli",
  pointValue: 15
}, 
{
  plantType: "tomato",
  pointValue: 20
}];
// let setPlantPos = [];
let plantLimit = 20;
let lowChance = 10;
let midLowChance = 20;
let midhighChance = 30;
// let highChance = 40;


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
function getRandomPlant() {
  const randomNumber = Math.ceil((Math.random() * 100));
  console.log(randomNumber);
  if (randomNumber > 100 - lowChance) {
    return plantTypes[3];
  } else if (randomNumber > 100 - midLowChance) {
    return plantTypes[2];
  } else if (randomNumber > 100 - midhighChance) {
    return plantTypes[1];
  } else {
    return plantTypes[0];
  }

}

function plantSpawner(spawnInterval) {
  setInterval(() => {
    if (plants.length < plantLimit && gameState == "run") {
      const setPlantPos = setRandomPlantPos();
      const randomPlant = getRandomPlant();
      
      plants.push(
        new Plant(
          randomPlant.plantType,
          randomPlant.pointValue,
          setPlantPos[0],
          setPlantPos[1],
          PlayerOne,
          PlayerTwo,
          tileSize
        )
      );
    }
  }, spawnInterval);
}

let animationTopPlayerOne;
let animationTopPlayerTwo;

function preload() {
  grass = loadImage("assets/grass2.png");
  // Initialization of all animations
  animationTopPlayerOne = [
    loadImage("assets/blue-man-running1.png"),
    loadImage("assets/blue-man-running2.png"),
  ];
  animationTopPlayerTwo = [
    loadImage("assets/red-man-run1.png"),
    loadImage("assets/red-man-run2.png"),
  ];
}

window.preload = preload;

function setup() {
  let canvas = createCanvas(1280, 720);
  canvas.parent("container");
  PlayerOne = new Player(500, 500, 68, 5, 65, 87, 83, 69);
  PlayerTwo = new Player(100, 100, 39, 5, 37, 38, 40, 13);
  Chest = new Basket(575, 600);
}
window.setup = setup;
let index = 0;
let PlayerOne;
let PlayerTwo;
let Chest;
``;

//------------------------------------------------------------playground plant

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

plantSpawner(1000);

function draw() {
  if (gameState == "start") {
    textSize(32);
    text("Press ENTER to start the game", 420, 100);
    text("Or scroll down to see some tips", 420, 160);
  }
  if (keyIsDown(13)) {
    gameState = "run";
  }
  if (gameState === "run") {
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
    PlayerOne.plantPickup(plants);
    PlayerTwo.plantPickup(plants);
    PlayerOne.EscapeFromPrison();
    PlayerTwo.EscapeFromPrison();

    Chest.createBasket();

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
  }
  // --
}

window.draw = draw;

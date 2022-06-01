import { Player } from "./player.js";
import { Garden } from "./garden.js";
import { Booster } from "./booster.js";
import { Plant } from "./plant.js";
import { Basket } from "./basket.js";
let gameState = "start";

// Remove page scroll on arrows, because it interfers with game controls

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

let basketStartX = 575;
let basketStartY = 600;

let grass;
let redWinGraphic;
let blueWinGraphic;

let randomX = Math.floor(Math.random() * (1000 - 100 + 1));
let boostersList = ["prison", "speed", "booze", "teleport"];
let priorBooster;
let randomBoost;

let plants = [];
const plantTypes = [
  {
    plantType: "potato",
    pointValue: 5,
  },
  {
    plantType: "carrot",
    pointValue: 10,
  },
  {
    plantType: "broccoli",
    pointValue: 15,
  },
  {
    plantType: "tomato",
    pointValue: 20,
  },
];

let plantLimit = 20;

function getRandomBooster() {
  while (randomBoost === priorBooster) {
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
  // Loop over the plants array until you get the empty one
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
  const randomNumber = Math.ceil(Math.random() * 100);
  if (randomNumber <= 10) {
    return plantTypes[3];
  } else if (randomNumber <= 20) {
    return plantTypes[2];
  } else if (randomNumber <= 30) {
    return plantTypes[1];
  } else {
    return plantTypes[0];
  }
}

function plantSpawner(spawnInterval) {
  setInterval(() => {
    if (plants.length < plantLimit && gameState === "run") {
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

let animationsPlayerOne;
let animationsPlayerTwo;

function preload() {
  grass = loadImage("assets/grass2.png");
  redWinGraphic = loadImage("assets/red-win.png");
  blueWinGraphic = loadImage("assets/blue-win.png");
  // Initialization of all animations
  animationsPlayerOne = {
    upp: [
      loadImage("assets/blue-player/blue-upp1.png"),
      loadImage("assets/blue-player/blue-upp2.png"),
    ],
    down: [
      loadImage("assets/blue-player/blue-down1.png"),
      loadImage("assets/blue-player/blue-down2.png"),
    ],
    right: [
      loadImage("assets/blue-player/blue-right1.png"),
      loadImage("assets/blue-player/blue-right2.png"),
    ],
    left: [
      loadImage("assets/blue-player/blue-left1.png"),
      loadImage("assets/blue-player/blue-left2.png"),
    ],
    uppCarry: [
      loadImage("assets/blue-player/blue-upp-carry1.png"),
      loadImage("assets/blue-player/blue-upp-carry2.png"),
    ],
    downCarry: [
      loadImage("assets/blue-player/blue-down-carry1.png"),
      loadImage("assets/blue-player/blue-down-carry2.png"),
    ],
    rightCarry: [
      loadImage("assets/blue-player/blue-right-carry1.png"),
      loadImage("assets/blue-player/blue-right-carry2.png"),
    ],
    leftCarry: [
      loadImage("assets/blue-player/blue-left-carry1.png"),
      loadImage("assets/blue-player/blue-left-carry2.png"),
    ],
  };
  animationsPlayerTwo = {
    upp: [
      loadImage("assets/red-player/red-upp1.png"),
      loadImage("assets/red-player/red-upp2.png"),
    ],
    down: [
      loadImage("assets/red-player/red-down1.png"),
      loadImage("assets/red-player/red-down2.png"),
    ],
    right: [
      loadImage("assets/red-player/red-right1.png"),
      loadImage("assets/red-player/red-right2.png"),
    ],
    left: [
      loadImage("assets/red-player/red-left1.png"),
      loadImage("assets/red-player/red-left2.png"),
    ],
    uppCarry: [
      loadImage("assets/red-player/red-upp-carry1.png"),
      loadImage("assets/red-player/red-upp-carry2.png"),
    ],
    downCarry: [
      loadImage("assets/red-player/red-down-carry1.png"),
      loadImage("assets/red-player/red-down-carry2.png"),
    ],
    rightCarry: [
      loadImage("assets/red-player/red-right-carry1.png"),
      loadImage("assets/red-player/red-right-carry2.png"),
    ],
    leftCarry: [
      loadImage("assets/red-player/red-left-carry1.png"),
      loadImage("assets/red-player/red-left-carry2.png"),
    ],
  };
}

window.preload = preload;

function setup() {
  let canvas = createCanvas(1280, 720);
  canvas.parent("container");
  PlayerOne = new Player(width / 2 - 200, 500, 68, 5, 65, 87, 83, 69, 69);
  PlayerTwo = new Player(width / 2 + 125, 500, 39, 5, 37, 38, 40, 13, 13);
  Chest = new Basket(basketStartX, basketStartY);
}
window.setup = setup;
let index = 0;
let PlayerOne;
let PlayerTwo;
let Chest;

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

plantSpawner(1400);

function draw() {
  if (gameState === "start") {
    background("#214770");
    textSize(32);
    textStyle(ITALIC);
    fill("white");
    text("Press ENTER to start the game", width / 2 - 240, height / 2 - 35);
    text("Or scroll down to see some tips", width / 2 - 240, height / 2);
  }
  if (keyIsDown(13)) {
    gameState = "run";
  }
  if (gameState === "run") {
    image(grass, 0, 0);
    let tiles = new Garden();

    randomX = Math.floor(Math.random() * (1000 - 100 + 1));

    tiles.drawTiles(tilesX, tilesY, tileSize);

    for (let i = 0; i < plants.length; i++) {
      plants[i].drawPlant();
    }

    Chest.createBasket();
    PlayerTwo.movePlayer();
    PlayerOne.movePlayer();
    PlayerOne.plantPickup(plants);
    PlayerTwo.plantPickup(plants);
    PlayerOne.animatePlayer(animationsPlayerOne, index);
    PlayerTwo.animatePlayer(animationsPlayerTwo, index);
    PlayerOne.EscapeFromPrison();
    PlayerTwo.EscapeFromPrison();

    PlayerOne.putItemIntoBasket(basketStartX, basketStartY);
    PlayerTwo.putItemIntoBasket(basketStartX, basketStartY);

    PlayerOne.printScore("Blue guy score:", 100, height - 40);
    PlayerTwo.printScore("Red guy score:", 1000, height - 40);

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

    // These two if's are responsible for  all animations
    // Since we decided on having 2 frames for all animations, we can set global index (line 27)
    // And then change it twice a second

    if (frameCount % 15 === 0) {
      index = 0;
    }
    if (frameCount % 30 === 0) {
      index = 1;
    }
  }
  if (PlayerOne.isWon()) {
    setVictory("Blue Guy");
  } else if (PlayerTwo.isWon()) setVictory("Red Guy");
}

window.draw = draw;

function setVictory(player) {
  gameState = "victory";
  if (gameState === "victory") {
    if (player === "Blue Guy") {
      background("#214770");
      image(blueWinGraphic, 0, 0);
    } else {
      background("#730a0a");
      image(redWinGraphic, 0, 0);
    }
    textAlign(CENTER);
    text(`${player} Won. Congratulations!`, width / 2, height / 2 - 50);
    text("Press SPACE to continue", width / 2, height / 2);
  }

  if (keyIsDown(32)) {
    if (gameState === "victory") {
      PlayerOne.score = 0;
      PlayerTwo.score = 0;
      gameState = "start";
      plants = [];
      location.reload();
    }
  }
}

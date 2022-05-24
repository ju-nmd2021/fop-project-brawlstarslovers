

class Plant {
  constructor(plantType, pointValue, plantX, plantY, playerOne, playerTwo, tileSize) {
    this.plantType = plantType;
    this.pointValue = pointValue;
    this.plantX = plantX;
    this.plantY = plantY;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.isPickedUp = false;
    this.spawnInterval = 1000;
    this.plantImage = loadImage("assets/" + plantType + ".png");
    this.tileSize = tileSize;
  }
  spawnTimer() {
    setInterval(() => {
      console.log(this.plantType);
    }, this.spawnInterval);
  }
  drawPlant() {
    let tileOffset = (this.tileSize - this.plantImage.width) / 2;
    image(this.plantImage, this.plantX + tileOffset, this.plantY + tileOffset);
  }
}

export { Plant };

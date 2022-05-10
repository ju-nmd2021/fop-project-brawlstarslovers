// let counter = 0;

class Plant {
  constructor(plantType, plantX, plantY, playerOne, playerTwo, tileSize) {
    this.plantType = plantType;
    this.plantX = plantX;
    this.plantY = plantY;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.isPickedUp = false;
    this.spawnInterval = 1000;
    this.pointWorth = 0;
    this.plantImage = loadImage("../assets/" + plantType + ".png");
    this.tileSize = tileSize;
    // this.tileOffest = (this.tileSize - this.plantImage.width) / 2;
  }
  spawnTimer() {
    setInterval(() => {
      // counter++;
      console.log(this.plantType);
      // console.log((this.tileSize - this.plantImage.width) / 2);
      // console.log(counter);
    }, this.spawnInterval);
  }
  drawPlant() {
    // this.tomatoImage.resize(60, 60);
    let tileOffset = (this.tileSize - this.plantImage.width) / 2;
    image(this.plantImage, this.plantX + tileOffset, this.plantY + tileOffset);
  }
}

export { Plant };

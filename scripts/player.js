class Player {
  // Constructor receives arguments from created instances of classes (line 33 and line 44 of farming-game.js)
  constructor(
    playerX,
    playerY,
    keyRight,
    playerSpeed,
    keyLeft,
    keyTop,
    keyBottom,
    keyPickup,
    keyDrop,
  ) {
    this.score = 0;
    this.spaceBarsCounter = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.keyRight = keyRight;
    this.playerSpeed = playerSpeed;
    this.keyLeft = keyLeft;
    this.keyTop = keyTop;
    this.keyBottom = keyBottom;
    this.keyPickup = keyPickup;
    this.isImprisoned = false;
    this.prison = loadImage("assets/jail1.png");
    this.playerWidth = 72;
    this.isHoldingPlant = false;
    this.heldPlant;
    this.keyDrop = keyDrop;
  }
  animatePlayer(runningFramesArray, holdingFramesArray, index) {
    if (!this.isHoldingPlant) {
      image(runningFramesArray[index], this.playerX, this.playerY);
    } else if(this.isHoldingPlant) {
      image(holdingFramesArray[index], this.playerX, this.playerY);
    }
    
    if (this.isHoldingPlant) {
      image(this.heldPlant.plantImage, this.playerX + this.playerWidth / 6, this.playerY - this.playerWidth /3 );
      // console.log("plantHold is running");
    }
  }
  movePlayer() {
    if (keyIsDown(this.keyRight)) {
      this.playerX += this.playerSpeed;
    }
    if (keyIsDown(this.keyLeft)) {
      this.playerX -= this.playerSpeed;
    }
    if (keyIsDown(this.keyTop)) {
      this.playerY -= this.playerSpeed;
    }
    if (keyIsDown(this.keyBottom)) {
      this.playerY += this.playerSpeed;
    }
  }
  plantPickup(plants) {
    if (this.checkPosition(plants)) {
      this.isHoldingPlant = true;
    }
  }
  checkPosition(plants) {
    if (keyIsDown(this.keyPickup)) {
      // Check position using center of player
      for (let i = 0; i < plants.length; i++) {
        if (
          this.playerX + this.playerWidth / 2 >= plants[i].plantX &&
          this.playerX + this.playerWidth / 2 <=
            plants[i].plantX + plants[i].tileSize
        ) {
          if (
            this.playerY + this.playerWidth / 2 >= plants[i].plantY &&
            this.playerY + this.playerWidth / 2 <=
              plants[i].plantY + plants[i].tileSize
          ) {
            if(!this.heldPlant) {
            this.heldPlant = plants[i];
            console.log(this.heldPlant);
            plants.splice(i, 1);
            return true
          }
          }
        }
      }
    }
  }
  EscapeFromPrison() {
    if (this.isImprisoned === true) {
      textStyle(BOLD);
      fill("white");
      textSize(32);
      text("You are imprisoned! Smash SPACEBAR to escape!", 260, 700);
      image(this.prison, 605, 10);
      if (keyIsDown(32) && this.spaceBarsCounter < 30) {
        this.spaceBarsCounter += 1;
        if (this.spaceBarsCounter >= 30) {
          this.playerSpeed = 5;
          this.spaceBarsCounter = 0;
          this.isImprisoned = false;
        }
      }
    }
  }
  putItemIntoBasket(x, y) {
    if ( this.playerX <= x + 40 && 
      this.playerX >= x - 40 &&
      this.playerY <= y + 40 &&
      this.playerY >= y - 40 && 
      this.heldPlant &&
      keyIsDown(this.keyDrop)) {
        this.score += this.heldPlant.pointValue;
        this.heldPlant = false;
        console.log(this.score + ' - score');
        this.isHoldingPlant = false;
      }
  }
}

export { Player };

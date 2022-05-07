class Player {
  // Constructor receives arguments from created instances of classes (line 33 and line 44 of farming-game.js)
  constructor(
    playerX,
    playerY,
    keyRight,
    playerSpeed,
    keyLeft,
    keyTop,
    keyBottom
  ) {
    this.spaceBarsCounter = 0;
    this.playerX = playerX;
    this.playerY = playerY;
    this.keyRight = keyRight;
    this.playerSpeed = playerSpeed;
    this.keyLeft = keyLeft;
    this.keyTop = keyTop;
    this.keyBottom = keyBottom;
    this.isImprisoned = false;
    this.prison = loadImage("../assets/jail1.png");
  }
  animatePlayer(framesArray, index) {
    image(framesArray[index], this.playerX, this.playerY);
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
  EscapeFromPrison() {
    if (this.isImprisoned === true) {
      image(this.prison, 605, 10);
      if(keyIsDown(32) && this.spaceBarsCounter < 30) {
        this.spaceBarsCounter += 1;
        if(this.spaceBarsCounter >= 30) {
          this.playerSpeed = 3;
          this.spaceBarsCounter = 0;
          this.isImprisoned = false;
          console.log('You are free');
        }
      }
    }
  }
}

export { Player };

class Booster {
  constructor(posX, posY, type, playerOne, playerTwo) {
    this.posX = posX;
    this.posY = posY;
    this.type = type;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.isActive = true;
    this.spaceBarsCounter = 0;
    this.star = loadImage("assets/star.png");
    this.assets = {
      speed: loadImage("assets/speed.png"),
      prison: loadImage("assets/star.png"),
      booze: loadImage("assets//booze.png"),
      teleport: loadImage("assets/teleport.png"),
    };
  }
  createBooster() {
    if (this.isActive) {
      image(this.assets[this.type], this.posX, this.posY);
      this.posY -= 3;
    }
  }

  checkPlayerCollision(playerX, playerY, player) {
    let targetEnemy =
      player === this.playerOne ? this.playerTwo : this.playerOne;
    if (
      playerX <= this.posX + 40 &&
      playerX >= this.posX - 40 &&
      playerY <= this.posY + 40 &&
      playerY >= this.posY - 40 &&
      this.isActive
    ) {
      if (this.type == "speed") {
        player.playerSpeed = 8;
        setTimeout(() => {
          player.playerSpeed = 5;
        }, 5000);
      }
      if (this.type == "prison") {
        targetEnemy.isImprisoned = true;
        targetEnemy.playerSpeed = 0;
        [targetEnemy.playerX, targetEnemy.playerY] = [605, 10];
      }
      if (this.type == "booze") {
        if (targetEnemy == this.playerTwo) {
          targetEnemy.keyRight = 37;
          targetEnemy.keyLeft = 39;
          targetEnemy.keyTop = 40;
          targetEnemy.keyBottom = 38;

          setTimeout(() => {
            targetEnemy.keyRight = 39;
            targetEnemy.keyLeft = 37;
            targetEnemy.keyTop = 38;
            targetEnemy.keyBottom = 40;
          }, 5000);
        } else {
          targetEnemy.keyRight = 65;
          targetEnemy.keyLeft = 68;
          targetEnemy.keyTop = 83;
          targetEnemy.keyBottom = 87;

          setTimeout(() => {
            targetEnemy.keyRight = 68;
            targetEnemy.keyLeft = 65;
            targetEnemy.keyTop = 87;
            targetEnemy.keyBottom = 83;
          }, 5000);
        }
        // 39 right 37 left 38 top 40 bottom
      }
      if (this.type == "teleport") {
        targetEnemy.playerX = Math.floor(Math.random() * (1000 - 100 + 1));
        targetEnemy.playerY = 25;
      }
      // Deactivate and remove booster on collision
      this.isActive = false;
    }
  }
}

export { Booster };
 
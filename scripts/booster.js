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
    this.assets = {'speed': loadImage("../assets/speed.png"),
                   'prison': loadImage("../assets/star.png")};
  }
  createBooster() {
    if(this.isActive) {
    image(this.assets[this.type], this.posX, this.posY);
    this.posY -= 3;
    }
  }
  checkPlayerCollision(playerX, playerY, player) {
    let targetEnemy = player === this.playerOne ? this.playerTwo : this.playerOne;
    let targetUser = player === this.playerOne ? this.playerOne : this.playerTwo;
    if (
      playerX <= this.posX + 40 &&
      playerX >= this.posX - 40 &&
      playerY <= this.posY + 40 &&
      playerY >= this.posY - 40 &&
      this.isActive
    ) {
      if (this.type == "speed") {
        player.playerSpeed = 6;
        setTimeout(() => {
          if(!targetUser.isImprisoned) {
            player.playerSpeed = 3;
          }
        }, 5000);
      }
      if (this.type == "prison") {
        targetEnemy.isImprisoned = true;
        targetEnemy.playerSpeed = 0;
        console.log(targetEnemy.playerSpeed);
        [targetEnemy.playerX, targetEnemy.playerY] = [605, 10];
      }
      // Deactivate and remove booster on collision
      this.isActive = false;
    }
  }
}

export { Booster };

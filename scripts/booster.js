class Booster {
  constructor(posX, posY, type) {
    this.posX = posX;
    this.posY = posY;
    this.type = type;
    this.isActive = true;
    this.strawberry = loadImage("assets/strawberry.png");
  }
  createBooster() {
    if(this.isActive) {
    image(this.strawberry, this.posX, this.posY);
    this.posY -= 3;
    }
  }
  checkPlayerCollision(playerX, playerY, player) {
    if (
      playerX <= this.posX + 15 &&
      playerX >= this.posX - 15 &&
      playerY <= this.posY + 15 &&
      playerY >= this.posY - 15 &&
      this.isActive
    ) {
      if (this.type == "speed") {
        player.playerSpeed = 6;
        setTimeout(() => {player.playerSpeed = 3}, 5000);
        this.isActive = false;
      }
    }
  }
}

export { Booster };

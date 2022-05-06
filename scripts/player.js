
class Player {
  constructor(playerX, playerY) {
    this.playerX = playerX;
    this.playerY = playerY;
  }
  animatePlayer(framesArray, index) {
    image(framesArray[index], this.playerX, this.playerY);
  }
};

export { Player };
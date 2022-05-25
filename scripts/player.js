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
    keyDrop
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
    this.direction = "upp";
    this.pickupAudio = new Audio("assets/audio/pop.mp3");
    this.dropOffAudio = new Audio("assets/audio/hand-in.mp3");
    this.displayPoints = false;
    this.lastPointGain;
    this.displayTime = 0;
  }
  animatePlayer(animations, index) {
    if (!this.isHoldingPlant) {
      if (this.direction === "right") {
        image(animations.right[index], this.playerX, this.playerY);
      } else if (this.direction === "left") {
        image(animations.left[index], this.playerX, this.playerY);
      } else if (this.direction === "upp") {
        image(animations.upp[index], this.playerX, this.playerY);
      } else if (this.direction === "down") {
        image(animations.down[index], this.playerX, this.playerY);
      }
    } else if (this.isHoldingPlant) {
      if (this.direction === "right") {
        image(animations.rightCarry[index], this.playerX, this.playerY);
      } else if (this.direction === "left") {
        image(animations.leftCarry[index], this.playerX, this.playerY);
      } else if (this.direction === "upp") {
        image(animations.uppCarry[index], this.playerX, this.playerY);
      } else if (this.direction === "down") {
        image(animations.downCarry[index], this.playerX, this.playerY);
      }
    }

    if (this.displayPoints) {
      if (this.displayTime <= 40) {
        this.displayPointsEarned();
        this.displayTime++;
      } else if (this.displayTime > 40) {
        this.displayTime = 0;
        this.displayPoints = false;
      }
    }

    if (this.isHoldingPlant) {
      image(
        this.heldPlant.plantImage,
        this.playerX + 8,
        this.playerY - this.playerWidth / 3
      );
    }
  }
  movePlayer() {
    if (keyIsDown(this.keyRight)) {
      this.playerX += this.playerSpeed;
      this.direction = "right";
    }
    if (keyIsDown(this.keyLeft)) {
      this.playerX -= this.playerSpeed;
      this.direction = "left";
    }
    if (keyIsDown(this.keyTop)) {
      this.playerY -= this.playerSpeed;
      this.direction = "upp";
    }
    if (keyIsDown(this.keyBottom)) {
      this.playerY += this.playerSpeed;
      this.direction = "down";
    }
  }
  plantPickup(plants) {
    if (this.checkPosition(plants)) {
      this.isHoldingPlant = true;
      this.pickupAudio.play();
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
            if (!this.heldPlant) {
              this.heldPlant = plants[i];
              plants.splice(i, 1);
              return true;
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
  putItemIntoBasket(basketX, basketY) {
    if (
      this.playerX + this.playerWidth / 2 <= basketX + 128 &&
      this.playerX + this.playerWidth / 2 >= basketX &&
      this.playerY + this.playerWidth / 2 <= basketY + 128 &&
      this.playerY + this.playerWidth / 2 >= basketY &&
      this.heldPlant &&
      keyIsDown(this.keyDrop)
    ) {
      this.score += this.heldPlant.pointValue;
      this.lastPointGain = this.heldPlant.pointValue;
      this.displayPoints = true;
      this.heldPlant = false;
      this.dropOffAudio.play();
      this.isHoldingPlant = false;
    }
  }
  displayPointsEarned() {
    textSize(32);
    fill(255);
    text(this.lastPointGain, this.playerX, this.playerY);
  }
  printScore(sign, scoreX, scoreY) {
    noStroke();
    textStyle(BOLD);
    fill("white");
    textSize(32);
    text(`${sign} ${this.score}`, scoreX, scoreY);
  }

  isWon() {
    if (this.score >= 60) {
      return true;
    }
  }
}

export { Player };

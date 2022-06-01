class Basket {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = loadImage("assets/chest.png");
  }
  createBasket() {
    image(this.img, this.x, this.y);
  }
}

export { Basket };

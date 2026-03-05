class Player {
  constructor() {
    this.x = 100;
    this.y = 300;
    this.size = 64; // increase if your image is bigger
    this.speed = 3;
    this.type = "boy";
    this.img = null; // make sure this exists
    this.nearBuilding = null;
  }

  setCharacter(type) {
    this.type = type;

    if (type === "boy") {
      this.img = playerImages[0];
    } else if (type === "girl") {
      this.img = playerImages[1];
    } else if (type === "unisex") {
      this.img = playerImages[2];
    }
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    if (this.img) {
      image(this.img, this.x, this.y, this.size, this.size);
    }
  }
}

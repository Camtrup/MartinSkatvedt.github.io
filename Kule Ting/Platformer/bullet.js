class Bullet {
  constructor(x, y, dir) {
    this.w = 10;
    this.h = 5;
    if (dir > 0)this.x = x + (this.w*2);
    else this.x = x - this.w;
    this.y = y - (0.33*this.h);
    this.speed = 10 * dir;
  }

  update() {
    this.x += this.speed;
  }

  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
}

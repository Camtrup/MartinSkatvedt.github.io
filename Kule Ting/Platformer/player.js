class Player {
  constructor(x, y) {
    this.w = 20;
    this.h = 30;
    this.x = x;
    this.y = y - this.h;
    this.bottom = this.y;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.jumping = false;
    this.gravity = 0.15;
    this.dir = 1;
    this.maxHeight = 265;
    this.nBullets = 30;
    this.bullets = [];
  }

  show() {
    fill(255);
    rect(this.x,this.y,this.w,this.h);
  }

  jump() {
    if (!(this.jumping)) this.y -= 5;
    if (this.y > this.maxHeight) this.jumping = true;
  }

  update() {
    this.ySpeed += this.gravity;
    if (this.y < this.bottom) this.y += this.ySpeed;
    else {
      this.ySpeed = 0;
      this.y = this.bottom;
      this.jumping = false;
    }
    if (keyIsDown(LEFT_ARROW)){
      player.x -= this.xSpeed;
      this.dir = -1;
    }
    if (keyIsDown(RIGHT_ARROW)){
      player.x += this.xSpeed;
      this.dir = 1;
    }
    if (keyIsDown(UP_ARROW)) this.jump();
  }

  shoot(bullet) {
    this.bullets.push(bullet);
    player.nBullets--;
  }

}

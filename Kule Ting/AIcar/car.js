

class Car {
  constructor() {
    this.w = 5;
    this.h = 10;
    this.pos = createVector(419, 337);
    this.speed = 5;
    this.rays = [];
    this.lookAtAngle = 0;
    this.vel = 0;
    this.fov = 360;
    this.distances = [];
    this.nRays = 8;
    this.step = this.fov/this.nRays;
    this.model = new NeuralNet();
    this.model.add(new dense({nodes: 8,activation: sigmoid}));
    this.model.add(new dense({nodes: 4,activation: sigmoid}));
    this.model.add(new dense({nodes: 2,activation: sigmoid}));
  }

  show() {
    fill(255);

    push();
    rectMode(CENTER);
    translate(this.pos.x,this.pos.y);
    rotate(radians(this.lookAtAngle) + HALF_PI);
    rect(0, 0, this.w, this.h);
    pop();
    stroke(255);
    let dir = p5.Vector.fromAngle(radians(this.lookAtAngle));
    line(this.pos.x,this.pos.y,this.pos.x + (dir.x * 10),this.pos.y+(dir.y*10));

    for (let ray of this.rays) {
      ray.show();
    }
  }

  update() {
    //if (keyIsDown(LEFT_ARROW)) this.pos.x -= this.speed;
    //if (keyIsDown(RIGHT_ARROW)) this.pos.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.amt = 2;
    if (keyIsDown(DOWN_ARROW)) this.amt = -2;

    if (keyIsDown(65)) this.lookAtAngle -= 2;
    if (keyIsDown(68)) this.lookAtAngle += 2;

    if (this.lookAtAngle > 360) this.lookAtAngle = 0;

    if (this.lookAtAngle < 0) this.lookAtAngle = this.lookAtAngle = 360 + this.lookAtAngle;

    let dir = p5.Vector.fromAngle(radians(this.lookAtAngle));
    this.pos.x += dir.x; //* this.amt;
    this.pos.y += dir.y; //* this.amt;

    this.rays = [];
    for (let a = this.lookAtAngle - (this.fov/2); a < this.lookAtAngle + (this.fov/2); a+=this.step) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  look(walls) {
    this.distances = [];
    for (let ray of this.rays) {

      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        let pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        if (record <= 1.0) return true;
        this.distances.push(record);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
}

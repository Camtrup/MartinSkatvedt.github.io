class Node {
  constructor() {
    this.r = 5;
    this.pos = createVector(200, 150);
    this.speed = 5;
    this.rays = [];
    this.lookAtAngle = 0;
    this.vel = 0;
    this.fov = 20;
    this.distances = [];
    this.step = 0.1;
  }

  show() {

    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r);

    for (let ray of this.rays) {
      ray.show();
    }


  }

  update(amt) {
    if (keyIsDown(LEFT_ARROW)) this.pos.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.pos.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.pos.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.pos.y += this.speed;


    if (keyIsDown(65)) this.lookAtAngle -= 2;
    if (keyIsDown(68)) this.lookAtAngle += 2;
    if (this.lookAtAngle > 360) this.lookAtAngle = 0;



    if (this.lookAtAngle < 0) this.lookAtAngle = this.lookAtAngle = 360 + this.lookAtAngle;
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
        const pt = ray.cast(wall);
        if (pt) {
          let d = p5.Vector.dist(this.pos, pt);
          const a = ray.angle - this.lookAtAngle;
          d *= cos(radians(a));
          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
        this.distances.push(record);
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }
}

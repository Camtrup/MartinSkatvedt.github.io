class Bird {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.r = 40; //Radius til bilde
    this.gravity = 0.7;
    this.lift = -10; //Hvor mye den skal løftes hver gang man hopper
    this.velocity = 0; //y-fart
    this.angle = 0;
  }

  show() { //Viser hode
    push();
    translate(this.x, this.y);
    angleMode(DEGREES);
    rotate(this.angle);
    image(flappyImage, 0, 0, this.r, this.r);
    pop();
  }

  update() { //Oppdaterer fuglen
    this.velocity += this.gravity; //Legger hele tiden til gravity
    this.y += this.velocity;

    if (this.y <= this.r) { //Sjekkeer om man er på toppen av canvas
      this.y = this.r ;
      this.velocity = 0;
    }

    if (this.y >= height - this.r) { //Sjekker om man er på bunnen av canvas
      this.y = height - this.r;
      this.velocity = 0;
    }
  }

  jump() { //Hopper
    this.velocity += this.lift;
  }
}

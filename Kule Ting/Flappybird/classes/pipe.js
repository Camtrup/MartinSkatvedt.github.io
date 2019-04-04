class Pipe {
  constructor() {
    this.speed = -5; //x-farten
    this.x = width; //x posisjonen til pipen
    this.w = 60; //Bredden på hver pipe
    this.scored = false; //Variabel for å sjekke om man har gitt poeng til pipen
    this.spacing = random(130, 160); //Mellomrom mellom pipene
    this.top = random(height / 6, 3 / 4 * height); //Høyden til øvre pipe
    this.bottom = height - (this.top + this.spacing);//Høyden til nedre pipe
  }

  show() { //Tegner begge bildene, med riktig høyde
    image(pipeRotateIMG,this.x, 0, this.w, this.top);
    image(pipeIMG,this.x, height - this.bottom, this.w, this.bottom, 0, 0, 138, this.bottom * 3);
  }

  update() { //Oppdaterer x posisjonen
    this.x += this.speed;
  }

  hit(x1,y1,x2,y2) {
    //collideRectRect er en funksjon fra collide2d bilblioteket
    //Man går funksjonen de fire hjørnene til 2 ulike rektangler, også gir den deg enn boolean som return
    let hit1 = collideRectRect(x1,y1,x2,y2, this.x, height - this.bottom, this.x + this.w, height);
    let hit2 = collideRectRect(x1,y1,x2,y2,this.x, 0, this.x + this.w, this.top);
    if (hit1 || hit2) return true;
    else return false;
  }
}

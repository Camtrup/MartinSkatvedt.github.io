
const bakke = document.getElementById("bakke");
const divPlayer = document.getElementById("player");

class player {
  constructor(x, y) {
    this.speed = 20;
    this.x = 100;
    this.y = 470;

    this.setPos();
  }

  getPos() {
    this.x = Number(divPlayer.style.left.replace(/\D/g,''));
    this.y = Number(divPlayer.style.top.replace(/\D/g,''));
    console.log(this.x, this.y);
  }
  setPos () {
    divPlayer.style.left = this.x + "px";
    divPlayer.style.top = this.y + "px";
    this.getPos();
  }

  moveRight() {
    this.x += this.speed;
    this.setPos(this.x, this.y);
  }
  moveLeft() {
    this.x -= this.speed;
    this.setPos(this.x, this.y);
  }
  jump() {
    this.y -= this.speed;
    this.setPos(this.x, this.y);
  }
}

let spiller = new player();

document.onkeydown = (key) => {
    switch (key.keyCode) {
      case 68:
        spiller.moveRight();
        break;
      case 65:
        spiller.moveLeft();
        break;
      case 32:
        spiller.jump();
        break;
      default:
        break;
    }
  }

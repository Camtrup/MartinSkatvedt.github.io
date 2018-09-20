let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let width = canvas.width, height = canvas.height;
let flag = true;

document.onclick = () => {
  if (flag) {
    setBH();
    setDir();
    gameLoop();
    document.getElementById("text").innerText = "";
    flag = false;
  }
}

document.onkeydown = (key) => {
  switch (key.key) {
    case 'w':
      move(spiller1, '-');
      break;
    case 's':
      move(spiller1, '+');
      break;
    case 'i':
      move(spiller2, '-');
      break;
    case 'k':
      move(spiller2, '+');
      break;
  }
}

let spiller1 = {
  "br": 20,
  "ho": 80,
  "color": "Black",
  "x": 50,
  "y": 40,
  "speed": 20,
  "dir": 1,
  "poeng": 0
}

let spiller2 = {
  "br": 20,
  "ho": 80,
  "color": "Black",
  "x": width - 70,
  "y": 40,
  "speed": 20,
  "dir": 1,
  "poeng": 0
}

let ball = {
  'r': 15,
  "color": "Black",
  'x': width / 2,
  'y': height / 2,
  "xspeed": 5,
  "yspeed": 2,
  "xdir": 1,
  "ydir": 1
}

function clearScreen() {
  ctx.fillStyle = "White";
  ctx.fillRect(0, 0, width, height);
  ctx.lineStyle = "#0";
  ctx.strokeRect(width/2, 0, 0, height);
}

function getRanDir() {
  let val = Math.round(Math.random());
  switch (val) {
    case 0:
      return -1;
      break;
    case 1:
      return 1;
      break;
  }
}
function setDir() {
  ball.xdir = getRanDir();
  ball.ydir = getRanDir();
}

function setBH() {
  let h = (Math.random() * 300)+ 99;
  ball.y = h;
}
let now, delta, fps = 60, then = Date.now(), interval = 1000/fps;
function draw() {
  requestAnimationFrame(draw);

  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    clearScreen();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = ball.color;
    ctx.fill();
    checkBound();

    ctx.fillStyle = spiller1.color;
    ctx.fillRect(spiller1.x, spiller1.y, spiller1.br, spiller1.ho);
    ctx.fillRect(spiller2.x, spiller2.y, spiller2.br, spiller2.ho);
    checkColl();
    let xspeed = ball.xspeed * ball.xdir;
    ball.x = ball.x + xspeed;
    ball.y += ball.yspeed * ball.ydir;

    then = now - (delta % interval);
  }
}

function move(spiller, dir) {
  if (dir == '-') {
    if (spiller.y > 0) {
      spiller.y -= spiller.speed;
    }
  }
  else if (dir == '+') {
    if (spiller.y <= 315) {
      spiller.y += spiller.speed;
    }
  }
}

function checkBound() {
  if (ball.y <= 0 + ball.r) {
    ball.ydir *= -1;
  }
  else if (ball.y >= (height - ball.r/2)) {
    ball.ydir *= -1;
  }
  else if (((ball.x - ball.r)+ spiller1.br) < (spiller1.x + spiller1.br)) {
    setPoint(spiller2, 1);
    resetGame();
  }
  else if (((ball.x + ball.r) - spiller2.br - 5) > spiller2.x) {
    setPoint(spiller1, 1);
    resetGame();
  }
}

function checkColl() {
  let yval1 = (spiller1.y + (spiller1.ho/2)) - ball.y;
  let xval1 = (spiller1.x + spiller1.br) - (ball.x - ball.r);
  let yval2 = spiller2.y + (spiller2.ho/2) - ball.y;
  let xval2 = spiller2.x - (ball.x + ball.r);

  if (xval1 == 0 && (yval1 <= 45 && yval1 >= -45)) {
    ball.xdir *= -1;
  }
  else if (xval2 == 0 && (yval1 <= 45 && yval2 >= -45)) {
    ball.xdir *= -1;
  }
}
function setPoint(spiller, poeng) {
  spiller.poeng += poeng;
}

function resetGame() {
  ball.x = width/2;
  setBH();
  setDir();
  gameLoop();

}
function gameLoop() {
  draw();
}

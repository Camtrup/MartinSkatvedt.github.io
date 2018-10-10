const canvas  = document.getElementById("canvas");
const div     = document.getElementById("canvasDiv");
const ctx     = canvas.getContext("2d");

let width  = canvas.width,
    height = canvas.height;

let now,
    delta,
    fps       = 144,
    then      = Date.now(),
    interval  = 1000/fps;

let mousePos,
    buf;

let matArr = [],
    antall = 11;

//Ball config
let ball = {
  r: 10,
  xSpeed: 5,
  ySpeed: 2,
  x: width/2,
  y: height/2
}

//Spiller config
let spiller = {
  w: 70,
  h: 20,
  x: width/2,
  y: height - 20
}

//Mat klasse
function mat(x, y) {
  this.w = 50;
  this.h = 20;
  this.x = x;
  this.y = y;
}

//Mus funksjon
document.onmousemove = (k) => {
  let rect = canvas.getBoundingClientRect();
  mousePos = k.clientX - (rect.left + 35);
  if ((mousePos > 0) && (mousePos < 630)) {
    spiller.x = mousePos;
  }
  else if (mousePos <= 0) {
    spiller.x = 0;
  }
  else if (mousePos >= 630) {
    spiller.x = 630;
  }
}

//Tegner spiller
function drawSpiller() {
  ctx.fillStyle = "white";
  ctx.fillRect(spiller.x, spiller.y, spiller.w, spiller.h);
}

//Sjekker kanter
function ballBorder() {
  if (ball.x + ball.r >= width) {
    ball.xSpeed *= -1;
  }
  if (ball.x - ball.r <= 0) {
    ball.xSpeed *= -1;
  }
  if(ball.y - ball.r <= 0) {
    ball.ySpeed *= -1;
  }

  if ((ball.x > spiller.x) && (ball.x < spiller.x + spiller.w)) {
    if (ball.y + ball.r > spiller.y) {
      ball.y -= 10;
      ball.ySpeed *= -1;
      calcSpeed(ball.xSpeed, ball.ySpeed);
    }
  }
}

//Tegner ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ballBorder();
    ball.x += ball.xSpeed;
    ball.y -= ball.ySpeed;
}

let x = 25, y = 10;
for (let i = 0; i < antall; i++) {
  matArr[i] = new mat(x, y);
  x += 60;
}

function drawMat() {
  x = 25, y = 10;

  ctx.fillStyle = "green";
  for (let i = 0; i < antall; i++) {
    ctx.fillRect(matArr[i].x, matArr[i].y, matArr[i].w, matArr[i].h);
  }
}

function matCollsion() {
  for (let i = 0; i < antall; i++) {
    if ((ball.x > matArr[i].x) && (ball.x < (matArr[i].x + matArr[i].w))) {
      if ((ball.y - ball.r) == (matArr[i].y + matArr[i].h)) {
        delyItem(i);
      }
    }
    else if ((ball.x > matArr[i].x) && (ball.x < (matArr[i].x + matArr[i].w))) {
      if ((ball.y + ball.r) == (matArr[i].y)) {
        delyItem(i);
      }
    }

    else if ((ball.y > matArr[i].y) && (ball.y < matArr[i].y + matArr[i].h)) {
      if (((ball.x + ball.r) >= matArr[i].x) && ((ball.x - ball.r) <= matArr[i].x + matArr[i].w)) {
        delxItem(i);
      }
    }

    else if ((ball.y > matArr[i].y) && (ball.y < matArr[i].y + matArr[i].h)) {
      if ((ball.x - ball.r) == (matArr[i].x + matArr[i].w)) {
        delxItem(i);
      }
    }
  }
}

function delxItem(i) {
  ball.xSpeed *= -1;
  antall --;
  buf = matArr[antall];
  matArr[antall] = matArr[i];
  matArr[i] = buf;
  matArr.pop();
}

function delyItem(i) {
  ball.ySpeed *= -1;
  antall --;
  buf = matArr[antall];
  matArr[antall] = matArr[i];
  matArr[i] = buf;
  matArr.pop();
}

function calcSpeed(xS, yS) {
  let s = Math.sqrt(Math.pow(xS, 2) + Math.pow(yS, 2));
  let sin = (yS / s);
  let cos = (xS / s);

  console.log(s, sin, cos);
}


function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  requestAnimationFrame(draw);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    drawBall();
    drawMat();
    drawSpiller();
    matCollsion();

    then = now - (delta % interval);
  }
}

requestAnimationFrame(draw);

let canvas = document.getElementById("canvas");
const div = document.getElementById("canvasDiv");
let ctx = canvas.getContext("2d");
let width = canvas.width, height = canvas.height;
let now, delta, fps = 144, then = Date.now(), interval = 1000/fps;
let mousePos, xpos = width/2;
let ballX, ballY, ballXSpeed, ballYSpeed;



document.onmousemove = (k) => {
  let rect = canvas.getBoundingClientRect();
  mousePos = k.clientX - (rect.left + 35);
  if ((mousePos > 0) && (mousePos < 630)) {
    xpos = mousePos;
  }
  else if (mousePos <= 0) {
    xpos = 0;
  }
  else if (mousePos >= 630) {
    xpos = 630;
  }

}

function drawSpiller() {
  ctx.fillStyle = "white";
  ctx.fillRect(xpos, height-20, 70, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(width/2, height/2, 10, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  requestAnimationFrame(draw);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    drawSpiller();
    drawBall();
    then = now - (delta % interval);
  }
}

requestAnimationFrame(draw);

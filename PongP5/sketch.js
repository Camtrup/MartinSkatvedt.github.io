function setup() {
  createCanvas(600, 400);
  background(0);
}

let spiller = {
  x: 300,
  y: 350,
  w: 70,
  h: 20,
  color: 255
}

function drawPlayer() {
  rect(spiller.x, spiller.y, spiller.w, spiller.h);
  fill(spiller.color);
}

function movePlayer() {
  spiller.x = mouseX - spiller.w / 2;
  console.log(mouseX);
}
function playerCollison() {
  if (spiller.x >= 0.5) movePlayer();
  else if (spiller.x < 0.5) spiller.x = 0.5;
}

function updatePlayer() {
  playerCollison();
  drawPlayer();
}

function draw() {
  background(0);
  updatePlayer();
}

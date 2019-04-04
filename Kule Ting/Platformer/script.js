
let player;
let bullets = [];
let groundLayer;

function setup() {
  createCanvas(600,400);
  background(0);
  groundLayer = height - 100;
  player = new Player(100, groundLayer);
}

function draw() {
  clear();
  background(0);
  player.update();
  player.show();

  fill(100);
  rect(0, groundLayer, width, height);

  for (i of bullets) {
    i.update();
    i.show();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32:
      bullets.push(new Bullet(player.x, player.y, player.dir));
      break;
    default:
      break;
  }
}


let player;
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

  text(player.nBullets, 10, 20);
  fill(100);
  rect(0, groundLayer, width, height);

  for (bullet of player.bullets) {
    bullet.update();
    bullet.show();
  }
}

function keyPressed() {
  switch (keyCode) {
    case 32:
    if (player.nBullets > 0) player.shoot(new Bullet(player.x, player.y, player.dir))
      break;
    default:
      break;
  }
}

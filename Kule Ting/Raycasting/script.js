

let node;
let boundries = [];


function setup() {
  createCanvas(800, 400);
  background(0);

  //boundries.push(new Boundry(100, 100, 200, 200));


  for (let i = 0; i < 3; i++) {
    let x1 = random(0, width/4);
    let x2 = random(width/4, width/2);
    let y1 = random(0, height/2);
    let y2 = random(height/2, height);
    boundries.push(new Boundry(x1, y1, x2, y2));
  }

  boundries.push(new Boundry(0, 0, 0, height));
  boundries.push(new Boundry(width/2, 0, width/2, height));
  boundries.push(new Boundry(0, 0, width/2, 0));
  boundries.push(new Boundry(0, height, width/2, height));

  node = new Node;
  node.show();
}

function draw() {
  clear();
  background(0);

  for (boundry of boundries) {
    boundry.show();
  }
  node.look(boundries);
  node.update();
  node.show();

  let lineWidth = (width/2) / node.distances.length;
  push();
  translate(width/2, 0)
  node.distances.forEach((distance, i) => {

    let sq = Math.pow(distance, 2);
    let wSq = Math.pow(width/2, 2);

    let c = map(sq, 0, wSq, 255, 0);
    let h = map(distance, 0, 400, 400, 0);
    fill(c);
    noStroke();
    rectMode(CENTER);
    rect((i * lineWidth) + (lineWidth/2), height/2, lineWidth+1, h);
  });
  pop();

}

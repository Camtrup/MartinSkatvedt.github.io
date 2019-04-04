const a_1 = document.getElementById("a_1");
const b_1 = document.getElementById("b_1");
const a_2 = document.getElementById("a_2");
const b_2 = document.getElementById("b_2");
const btn = document.getElementById("multiply");

let Input = (inp) => {
  inp.setup = () => {
    inp.createCanvas(400,400);
    inp.background(50);
    inp.stroke(255);
    inp.line(width/2,0, width/2, height);
    inp.line(0, height/2, width, height/2);
    inp.translate(inp.width/2,inp.height/2);
    inp.textSize(20);
    inp.text('real', inp.width/2 - 40, 20);
    inp.text('Imaginary', 5, -inp.height/2 + 20);
    inp.text("W", inp.width/2 - 40, inp.height/2 - 5);
  }

  inp.setPoint = (vals) => {
    inp.fill(255);
    inp.ellipse(vals[0], vals[1], 10, 10);
  }
}
let input = new p5(Input, 'inputContainer');

function setup() {
  createCanvas(400,400);
  background(50);
  stroke(255);
  line(width/2,0, width/2, height);
  line(0, height/2, width, height/2);
  translate(width/2,height/2);
  textSize(20);
  text('real', width/2 - 40, 20);
  text('Imaginary', 5, -height/2 + 20);
  text('Z', width/2 - 40, height/2 - 5);
}

function draw() {
  translate(width/2,height/2);
  if (mouseIsPressed) {
    let x = mouseX - width/2;
    let y = mouseY - height/2;
    ellipse(x,y,10,10);
    let point = getNewPoint(getAngle(x,y));
    input.setPoint(point);
  }
}

btn.onclick = () => {
  let a1 = a_1.value;
  let b1 = b_1.value;
  let a2 = a_2.value;
  let b2 = b_2.value;
  ellipse(a1, -1 * b1,10,10);
  ellipse(a2, -1 * b2,10,10);

  let a1Mapped = map(a1,- width/2, width/2, -1, 1);
  let b1Mapped = map(b1,height/2, - height/2, 1, -1);
  let a2Mapped = map(a2,- width/2, width/2, -1, 1);
  let b2Mapped = map(b2,height/2, - height/2, 1, -1);

  let first =  getPolar(a1Mapped, b1Mapped);
  let second = getPolar(a2Mapped, b2Mapped);
  let point = getNewPointMulti(multiply(first, second));
  console.log(point);
  input.setPoint(point);
}

function getPolar(x, y) {
  let c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  angleMode(DEGREES);
  let angle = atan(y/x);

  if (y < 0) angle = 360 + angle;
  if (x < 0) angle = 180 + angle;

  return [c, angle];
}

function multiply(first, second) {
  let magnitude = first[0] * second[0];
  let angle = first[1] + second[1];
  return [magnitude, angle];
}


function getAngle(x, y) {
  let c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  this.x = map(x, - width/2, width/2, -1, 1);
  this.y = map(y, - height/2, height/2, 1, -1);
  this.c = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

  let right = this.x * this.c;
  let left = Math.pow(this.x, 2);

  angleMode(DEGREES);
  let angle = acos(left/right);
  if (this.y < 0) angle = 360 - angle;
  return [c * c, angle * 2];

}

function getNewPoint(vals) {
  this.c = vals[0];
  this.angle = vals[1];
  if (this.angle > 360) this.angle -= 360;
  let x = map(this.c * cos(this.angle), -Math.pow(width/2,2), Math.pow(width/2,2), - width/2, width/2);
  let y = map(this.c * sin(this.angle), Math.pow(height/2,2), -Math.pow(height/2,2), - height/2, height/2);
  return [x, y];
}

function getNewPointMulti(vals) {
  this.c = vals[0];
  this.angle = vals[1];
  if (this.angle > 360) this.angle -= 360;

  console.log(this.c);
  let x = map(this.c * cos(this.angle), -1, 1, - width/2, width/2);
  let y = map(this.c * sin(this.angle), 1, -1, height/2, - height/2);
  return [x, y];
}

//Vinkler blir summet
//Lengde blir ganget

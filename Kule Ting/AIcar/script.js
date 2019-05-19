let car;
let cars = [];

let boundries = [];

const genSize = 50;

function preload() {
  boundries = [
  new Boundry(188, 342, 145, 145),
  new Boundry(342, 390, 145, 217),
  new Boundry(390, 392, 217, 285),
  new Boundry(392, 357, 285, 329),
  new Boundry(357, 260, 329, 331),
  new Boundry(260, 193, 331, 311),
  new Boundry(193, 180, 311, 234),
  new Boundry(180, 188, 234, 146),
  new Boundry(413, 468, 71,  182),
  new Boundry(99 , 413, 68,  71),
  new Boundry(468, 459, 182, 369),
  new Boundry(459, 348, 369, 410),
  new Boundry(348, 186, 410, 410),
  new Boundry(186, 96,  410, 323),
  new Boundry(96 , 92,  323, 199),
  new Boundry(92 , 99,  199, 70)];
}

function setup() {
  createCanvas(500, 500);
  background(0);

  for (let i = 0; i < genSize; i++) {
    cars.push(new Car);
  }
  cars.forEach((car, i) => {
    car.look(boundries);
    car.update();
    car.show();
  });
}

function draw() {
  clear();
  background(0);
  for (boundry of boundries) {boundry.show();}

  cars.forEach((car, i) => {

    try {
      if (car.look(boundries)) cars.splice(i, 1);

      let pred = car.model.predict(car.distances);

      if (pred[0] > pred[1]) car.lookAtAngle -= 2;
      else car.lookAtAngle += 2;

      car.update();
      car.show();
    } catch (e) {
      console.log("Not a error, just a car dying");
    }
  });
}


function mouseClicked(n) {
  console.log([mouseX, mouseY]);
}

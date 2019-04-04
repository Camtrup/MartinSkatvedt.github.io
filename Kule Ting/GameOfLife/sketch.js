const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const state    = document.getElementById("state");
const slider   = document.getElementById("slider");
const fpsOut   = document.getElementById("fpsOut");
const chooseMap= document.getElementById("chooseMap");

let res = 10;
let cols, rows;
let grid, nextGrid, naboGrid;
let gameStart = false;
let fps = 10;

function Clear() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
      nextGrid[i][j] = 0;
    }
  }
}

function glider() {
  Clear();
  grid[19][19] = 1;
  grid[20][20] = 1;
  grid[20][21] = 1;
  grid[21][20] = 1;
  grid[21][19] = 1;
}

function tenLine() {
  Clear();
  for (let i = 20; i < 30; i++) {
    grid[i][20] = 1;
  }
}

function gliderGun() {
  Clear();
  let array =
  [
  [0,0,0,0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,1,0,0],
  [0,0,0,0,0,1,0,0,0,0,0,1,0],
  [0,0,0,0,0,1,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,1,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,0,0,0,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0,0]];

  for (let i = 0; i < array.length; i++) {
    grid[10 + i] = array[i];
  }
}

chooseMap.onchange = () => {
  switch (chooseMap.value) {
    case "Clear":
      Clear();
      break;
    case "Glider":
      glider();
      break;
    case "10":
      tenLine();
      break;
    case "Glider Gun":
      gliderGun();
      break;
    default:
      break;
  }
  display();
}
slider.onchange = () => {
  fps = Number(slider.value);
  fpsOut.innerText = `Game running at ${fps} fps`;
  frameRate(fps)
}

startBtn.onclick = () => {
  gameStart = true;
  state.innerText = "Game Running";
}
pauseBtn.onclick = () => {
  gameStart = false;
  state.innerText = "Game Paused, you can now draw";
}

function createGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function getNaboCount(x, y) {
  let sumNabo = 0;
  for (let i = (x - 1); i <= (x + 1); i++) {
    for (let j = (y - 1); j <= (y + 1); j++) {
      if (i < 0 || j < 0 || i > cols -1 || j > rows - 1) {
        continue;
      }
      if (i == x && j == y) continue;
      if (grid[i][j] == 1) {
        sumNabo++;
      }
    }
  }
  return sumNabo;
}

function checkRules(x, y) {
  let isPop = grid[x][y];
  let sum = getNaboCount(x, y);
  naboGrid[x][y] = sum;
  let state = 0;

  if (isPop == 1) {
    if (sum <= 1) state = 0;
    else if (sum == 2 || sum == 3) state = 1;
    else if (sum >= 4) state = 0;
  }

  else {
    if (sum == 3) state = 1;
    else state = 0;
  }
  return state
}

function nextFrame() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nextGrid[i][j] = checkRules(i, j);
    }
  }
  grid = nextGrid;
  nextGrid  = createGrid(cols, rows);
}


function paint(key) {
  if (!gameStart) {
    let x = Math.floor(mouseX/res);
    let y = Math.floor(mouseY/res);

    if (key.shiftKey) {
        grid[x][y] = 0;
        fill(0);
        rect(x * res, y * res, res - 1, res - 1);
    }
    else {
      grid[x][y] = 1;
      fill(255);
      rect(x * res, y * res, res - 1, res - 1);
    }
  }
}

function mouseDragged(key) {
  try {
     paint(key);
  }
  catch {
  }
}
function mouseClicked(key) {
  try {
     paint(key);
  }
  catch {
  }
}


function setup() {
  frameRate(15);
  createCanvas(600, 600);
  background(0);
  fpsOut.innerText = `Game running at ${fps} fps`
  cols = Math.floor(width/res);
  rows = Math.floor(height/res);


  grid      = createGrid(cols, rows);
  nextGrid  = createGrid(cols, rows);
  naboGrid  = createGrid(cols, rows);


  stroke(255);
  strokeWeight(0.5);
  noFill();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j]) {
        fill(255);
      }
      else {
        noFill();
      }
      rect(i * res, j * res, res - 1, res - 1);
    }
  }
}

function display() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j]) {
        fill(255);
      }
      else {
        noFill();
      }
      rect(i * res, j * res, res - 1, res - 1);
    }
  }
}

function draw() {
  if (gameStart) {
    nextFrame();
    display();
  }
}

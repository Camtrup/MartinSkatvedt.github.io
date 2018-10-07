

let closedSet = [], openSet = [];

let brett =
[[0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0]];

let grid = brett;

let bHeight = brett.length, bWidth = brett[0].length;

function spot(x, y) {
  this.g = 0;
  this.h = 0;
  this.f = this.h + this.g;
  this.x = y;
  this.y = x;
  this.neighbours = [];

}


function aStar(board, start, stop) {
  for (let i = 0; i < bHeight; i++) {
    for (let j = 0; j < bWidth; j++) {
      grid[i][j] = new spot(i, j);
    }
  }
  console.log(start);
  openSet.push(grid[start]);
  console.log(openSet);
}

aStar(brett, [[0],[0]], [3][7]);

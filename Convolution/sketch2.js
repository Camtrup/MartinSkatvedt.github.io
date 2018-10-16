
const filterCols = 5, filterRows = filterCols;
const nFilters = 1;
let img = document.getElementById("img");
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = img.width;
canvas.height = img.height;
const orgCols = img.width, orgRows = img.height;


function createPixel2Darray() {
  let pixelData;
  let buf;
  let array  = new Array(orgRows);
  for (let i = 0; i < orgRows; i++) {
    array[i] = new Array(orgCols);
    for (let j = 0; j < orgCols; j++) {
      pixelData = ctx.getImageData(i,j,1,1).data;
      buf = ((pixelData[0] + pixelData[1] + pixelData[2]) / 3);
      if (buf === 0) array[i][j] = -1;
      else array[i][j] = 1;
    }
  }
  return array;
}

function createFilter() {
  let buf = 0;
  let filter = new Array(filterRows);
  for (let i = 0; i < filterRows; i++) {
    filter[i] = new Array(filterCols);
  }

  for (let i = 0; i < filterRows; i++) {
    for (let j = 0; j < filterCols; j++) {
      buf = Math.floor(Math.random() * 2);
      if (buf == 0) filter[i][j] = -1;
      else filter[i][j] = 1;
     }
   }
   console.table(filter);
   return filter;
}




function applyFilter(pixelBilde, filter) {
  let list = [];
  let rows = pixelBilde.length;
  let cols = pixelBilde[0].length;
  let sum = 0;
  let xs = -1, ys = -1;
  let pixler = new Array(rows);
  for (let i = 0; i < rows; i++) {
    pixler[i] = new Array(cols);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      for (let k = i  - Math.floor(filterRows / 2); k <= (i + (Math.floor(filterRows / 2))); k++) {
        ys += 1;
        for (let n = j - Math.floor(filterCols / 2); n <= (j+(Math.floor(filterCols / 2))); n++) {
          xs += 1;
          if (k < 0 || n < 0) continue;
          else if (k >= rows || n >= cols) continue;
          else sum += pixelBilde[k][n] * filter[xs][ys];
        }
        xs = -1;
      }
      sum /= 9;
      pixler[i][j] = sum;
      sum = 0;
      ys = -1;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pixler[i][j] <= 0) pixler[i][j] = 0;

    }
  }
  return pixler;
}

function drawPixels(pixelMap) {
  background(255);
  let pixelRow = pixelMap.length;
  let pixelCol = pixelMap[0].length;
  let bilde = createImage(pixelRow, pixelCol);
  bilde.loadPixels();
  for (let i = 0; i < pixelRow; i++) {
    for (let j = 0; j < pixelCol; j++) {
    bilde.set(i, j, pixelMap[i][j]);
    }
  }
  bilde.updatePixels();
  image(bilde, 0, 0);
}

function setup() {
  createCanvas(orgRows, orgCols);

  let filter = createFilter(filterRows, filterCols);
  let pixelImage = createPixel2Darray(orgRows, orgCols);



  let ny = applyFilter(pixelImage, filter);
  console.table(ny);
  drawPixels(ny);
}

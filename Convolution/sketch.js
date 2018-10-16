

let img = document.getElementById("img");
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = img.width;
canvas.height = img.height;
const orgCols = img.width, orgRows = img.height;
ctx.drawImage(img, 0, 0, orgCols, orgRows);

function createPixel2Darray() {
  let pixelData;
  let array  = new Array(orgRows);
  for (let i = 0; i < orgRows; i++) {
    array[i] = new Array(orgCols);
    for (let j = 0; j < orgCols; j++) {
      pixelData = ctx.getImageData(i,j,1,1).data;
      array[i][j] = Math.floor((pixelData[0] + pixelData[1] + pixelData[2]) / 3);
    }
  }
  return array;
}


function drawPixels(pixelMap) {
  background(255);
  let pixelRow = pixelMap.rows;
  let pixelCol = pixelMap.cols;
  let bilde = createImage(pixelRow, pixelCol);
  bilde.loadPixels();
  for (let i = 0; i < pixelRow; i++) {
    for (let j = 0; j < pixelCol; j++) {
    bilde.set(i, j, pixelMap.matrix[i][j]);
    }
  }
  bilde.updatePixels();
  image(bilde, 0, 0);
}


function setup() {
  createCanvas(orgCols, orgRows);
  background(255);

  let pixelImage = createPixel2Darray();
  let bilde = new IMG(pixelImage);
  bilde.blur(10);
  bilde.edgeDetect();

  drawPixels(bilde);
}

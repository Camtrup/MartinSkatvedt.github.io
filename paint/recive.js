function fillArray(data) {
  for (let i = 0; i < canvas.height; i++) {
    for (let j = 0; j < canvas.width; j++) {
      for (let n = 0; n < 3; n++) {
        pixelImage[i][j][n] = data[(i*(i+j))+ n]
      }
    }
  }
}

function create3dArray(height, width) {
  let arr = new Array(height);
  for (let i = 0; i < height; i++) {
    arr[i] = new Array(width);
  }

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      arr[i][j] = new Array(3);
    }
  }
  return arr;
}



class IMG {
  constructor(pixelImage) {
    this.rows = pixelImage.length;
    this.cols = pixelImage[0].length;
    this.matrix = pixelImage;
  }

  applyFilter(filter) {
    let filterRow = filter.length;
    let filterCol = filter[0].length;
    let neigh = 0;
    let sum = 0;
    let xs = -1, ys = -1;
    let pixler = new Array(this.rows);
    for (let i = 0; i < this.rows; i++) {
      pixler[i] = new Array(this.cols);
    }

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        for (let k = i  - Math.floor(filterRow / 2); k <= (i + (Math.floor(filterRow / 2))); k++) {
          ys += 1;
          for (let n = j - Math.floor(filterCol / 2); n <= (j+(Math.floor(filterCol / 2))); n++) {
            xs += 1;
            if (k < 0 || n < 0) continue;
            else if (k >= this.rows || n >= this.cols) continue;
            else sum += this.matrix[k][n] * filter[xs][ys];
            neigh ++;
          }
          xs = -1;
        }
        sum /= neigh;
        pixler[i][j] = sum;
        sum = 0;
        ys = -1;
        neigh = 0;
      }
    }
    return pixler;
  }

  blur(n) {
    let filter =
    [[1,1,1],
     [1,1,1],
     [1,1,1]];
     for (let i = 0; i < n; i++) {
       this.matrix = this.applyFilter(filter);
     }
  }

  magnitude(a, b) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.sqrt(Math.pow(a[i][j],2)+Math.pow(b[i][j],2));
      }
    }
  }


  edgeDetect(n) {
    if (n == undefined) n = 1;

    let fx =
    [[-1,0,1],
     [-2,0,2],
     [-1,0,1]];

    let fy =
    [[-1,-2,-1],
     [ 0, 0, 0],
     [ 1, 2, 1]];

     for (let i = 0 ; i < n; i ++) {
       let a = this.applyFilter(fx);
       let b = this.applyFilter(fy);
       this.magnitude(a,b);
     }
  }
}

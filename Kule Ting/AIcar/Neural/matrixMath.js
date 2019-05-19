class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  map(func) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let val = this.data[i][j];
        this.data[i][j] = func(val, i ,j);
      }
    }
  }

  static map(matrix, func) {
    let m = new Matrix(matrix.rows, matrix.cols);
    m.map((e, i, j) => func(matrix.data[i][j], i, j));
    return m;
 }

  static transpose(a) {
    let n = new Matrix(a.cols, a.rows)
    n.map((_, i, j) => a.data[j][i]);
    return n;
  }

  add(n) {
    if (n instanceof Matrix) {
      if (this.cols != n.cols || this.rows != n.rows) {
        console.log("Matrices does not match, cant add");
        return;
      }
      return this.map((e,i,j) => e + n.data[i][j]);
    }
    else return this.map(e => e + n);
  }

  static sub(a, b) {
    let result = new Matrix(a.rows, a.cols);
    if (a.cols != b.cols || a.rows != b.rows) {
      console.log("Matrices does not match, cant subtract");
      return;
    }
    for (let i = 0; i < a.rows; i++) {
      for (let j = 0; j < a.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
  return result;
  }

  multiply(n) {
    if (n instanceof Matrix) {
      if (this.cols != n.cols && this.rows != n.rows) {
        console.log("Matrices does not match, cant multiply");
        return;
      }
      return this.map((e,i,j) => e * n.data[i][j]);
    }
    else return this.map(e => e * n);
  }

  dot(n) {
    if (this.cols != n.rows) {
      console.log("Matrices does not match, cant dot");
      return;
    }
    else {
      let m = new Matrix(this.rows, n.cols);
      m.map((e, i, j) => {
        let sum = 0;
        for (let k = 0; k < this.cols; k++) {
          sum += this.data[i][k] * n.data[k][j];
        }
        return sum;
      });
      return m;
    }
  }

  randomize() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = ((Math.random() * 2) - 1);
      }
    }
  }

  print() {
    console.table(this.data);
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i in arr) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }
}

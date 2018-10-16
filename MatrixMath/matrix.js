class matrix {
  constructor(rows, cols) {
    this.cols = cols;
    this.rows = rows;
    this.matrix = [];

    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = []
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  add(n) {
    if (this.cols != n.cols && this.rows != n.rows) return undefined;
    else {
      if (n instanceof matrix) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            this.matrix[i][j] += n.matrix[i][j];
          }
        }
      }
      else {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.cols; j++) {
            this.matrix[i][j] += n;
          }
        }
      }
    }
  }

  mul(n){
    if (n instanceof matrix) {
      if (this.cols !== n.rows) return undefined;
      let result = new matrix(this.rows, n.cols);
      for (let i = 0; i < result.rows; i++) {
        for (let j = 0; j < result.cols; j++) {
          let sum = 0;
          for (let k = 0; k < this.cols; k++) {
            sum += this.matrix[i][k] * n.matrix[k][j];
          }
          result.matrix[i][j] = sum;
        }
      }
      return result;
    }
    else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.matrix[i][j] *= n;
        }
      }
    }
  }

  random() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = Math.floor(Math.random() * 10);
      }
    }
  }

  transpose() {
    let result = new matrix(this.cols, this.rows);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        result.matrix[j][i] = this.matrix[i][j];
      }
    }
    return result;
 }
}

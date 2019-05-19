function sigmoid(x) {
  return (1 / (1 + Math.exp(-x)));
}
function dsigmoid(y) {
  return y * (1 - y);
}

function tanh(x) {
  return Math.tanh(x);
}

function dtanh(y) {
  return 1 - Math.pow(tanh(y),2);
}

function relu(x) {
  return Math.max(0,x);
}

function drelu(y) {
  if (y > 0) return 1;
  else return 0;
}

function lrelu(x) {
  return Math.max(0.05*x, x);
}

function dlrelu(y) {
  if (y >= 0) return y;
  else return y / 20.00;
}

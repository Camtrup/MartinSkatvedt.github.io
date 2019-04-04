const model = new NeuralNet();

const xs =
[[0,0],
 [0,1],
 [1,0],
 [1,1]];

const ys =
[[0],
 [1],
 [1],
 [0]];
const fitConfig = {epochs: 100,learningRate: 0.1};
model.add(new dense({nodes: 2,activation: relu}));
model.add(new dense({nodes: 6,activation: relu}));
model.add(new dense({nodes: 1,activation: relu}));
model.fit(fitConfig, xs, ys);

let nLayers;
let layerNodes = [];
let h, w;
let max;
let b = 0;
let layerInfo = [];
let r = 40;
let val;
let we = [];
let prediction;

function setup() {
  createCanvas(500,500);
  background(100);
  nLayers = model.layers.length;
  model.layers.forEach((i) => layerNodes.push(i.nodes));
  max = layerNodes.reduce((a,b) => Math.max(a,b));
  w = width/nLayers;
  textAlign(CENTER);
  frameRate(2);
  for (let i = 0; i < nLayers; i++) {
    layerInfo.push([]);
    for (let j = 0; j < layerNodes[i]; j++) {
        h = height /layerNodes[i];
        let x = (i * w) + w/2;
        let y = (j * h) + h/2;
        layerInfo[i].push({
          node: layerNodes[i],
          x: x,
          y: y,
          b: 0,
          val: 0,
        })
    }
  }
}


function draw() {
  model.fit(fitConfig, xs, ys);
  clear();
  background(100);
  prediction = Number(model.predict([1,0]));
  for (let i = 0; i < nLayers - 1; i++) {
    for (let j = 0; j < layerNodes[i]; j++) {
      for (let z = 0; z < layerNodes[i + 1]; z++) {
        line(layerInfo[i][j].x,layerInfo[i][j].y,layerInfo[i+1][z].x,layerInfo[i+1][z].y)
      }
    }
   }


  for (let i = 0; i < nLayers; i++) {
    for (let j = 0; j < layerNodes[i]; j++) {
        h = height /layerNodes[i];
        let x = (i * w) + w/2;
        let y = (j * h) + h/2;

        if (i > 0) {
          b = Number(model.layers[i].bias.data[j]).toFixed(2);
          layerInfo[i][j].weights = model.layers[i].weights.data[j];
          for (let q = 0; q < layerInfo[i][j].weights.length; q++) {
            fill(255);
            text("w:"+layerInfo[i][j].weights[q].toFixed(2), x - r, y + (q*15));
          }
        }
        val = Number(model.layers[i].value.data[j]).toFixed(2)

        layerInfo[i][j].bias = b;
        layerInfo[i][j].val = val;
        fill(255);
        ellipse(x,y, r, r);
        fill(0);
        text(val, x, y);
        fill(255);
        text("Bias: " +b,x+r,y-r/2);
        text("Prediction: "+prediction.toFixed(2), 2*r, r);
    }
  }
}

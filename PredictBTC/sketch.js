

let table;

const model = tf.sequential();
const lr = 0.1;
const optimizer = tf.train.sgd(lr);
let prisTensor, tidTensor;
let tid = [];
function preload() {
  table = loadTable("./price.csv" , 'csv', 'header');
}

function setup() {
  createCanvas(600, 400);
  background(0);
  let pris = table.getColumn("Price USD");

  //pris.map(x => (x / 570) * height);
  console.log(Number(pris));

  tid = [];

  for (let i = 0; i < pris.length; i++) {
    tid.push(i);
  }

  tidTensor = tf.tensor1d(tid);
  prisTensor = tf.tensor1d(pris);

  let layer1 = tf.layers.dense({
    activation: "sigmoid",
    inputShape: [1],
    units: 15
  });

  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  });

  model.add(layer1);
  model.add(output);

  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  });
  //train();
}

function train() {
	const config = {
		epochs: 10,
		shuffle: false,
		validationSplit: 0.1,
		callbacks: {
			onEpochEnd: (num, logs) => {
				console.log("Epoch: " + num + "	Loss: " + logs.val_loss);
			},
			onBatchEnd: tf.nextFrame
		}
	};

	model.fit(tidTensor, prisTensor, config).then(results => {
	});
}

function draw() {

}

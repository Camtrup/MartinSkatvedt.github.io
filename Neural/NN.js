class NeuralNet {
  constructor () {
    this.layers = [];
  }

  add(classItem) {
    let current = this.layers.length;
    if (current > 0 && classItem instanceof dense) {
      let w = new Matrix(classItem.nodes, this.layers[current - 1].nodes);
      w.randomize();
      let b = new Matrix(classItem.nodes,1);
      b.randomize();
      classItem.weights = w;
      classItem.bias = b;
    }
    this.layers.push(classItem);
}

  feedForward(inputArray) {
    let inputs = Matrix.fromArray(inputArray);
    let temp;
    for (let i = 1; i < this.layers.length; i++) {
      temp = this.layers[i].weights.dot(inputs);
      temp.add(this.layers[i].bias);
      temp.map(this.layers[i].activation);
      inputs = temp;
    }
    return temp.toArray();
  }

  predict(xs) {
    return this.feedForward(xs);
  }

  fit(config, data, target) {
    let max = this.layers.length - 1;
    this.learningRate = config.learningRate;

    //Loop for all training epochs
    for (let i = 0; i < config.epochs; i++) {
      //Select random training sample
      let random = Math.floor(Math.random() * data.length);
      let inputs = Matrix.fromArray(data[random]);
      let ys = Matrix.fromArray(target[random]);
      this.layers[0].value = inputs;

      //feedForward
      let temp;
      for (let j = 1; j < this.layers.length; j++) {
        temp = this.layers[j].weights.dot(this.layers[j - 1].value);
        temp.add(this.layers[j].bias );
        temp.map(this.layers[j].activation);
        this.layers[j].value = temp;
      }

       //Calulate error
      let outputErrors = Matrix.sub(ys, this.layers[max].value);

      this.layers[max].error = outputErrors;

      //Loop though all layers
      for (let j = this.layers.length - 1; j > 0; j--) {
        let current = this.layers[j];

        //Select the derived activation for the layer
        let d;
        switch (current.activation) {
          case sigmoid:
            d = dsigmoid;
            break;
          case tanh:
            d = dtanh;
            break;
          case relu:
            d = drelu;
            break;
          case lrelu:
            d = dlrelu;
            break;
          default:
            d = dsigmoid;
            break;
        }

        //Calculate if you are on the last layer;
        if (j == max){
          //Calulate the local gradients for the weights to the last layer
          let gradients = Matrix.map(current.value, d);
          gradients.multiply(outputErrors);
          gradients.multiply(this.learningRate);

          //Calulate the change in weights
          let g = Matrix.transpose(this.layers[j - 1].value);
          let delta = gradients.dot(g);

          current.weights.add(delta);
          current.bias.add(gradients);
        }

        //Calulate if you are not on the last layer
        else {
          let hiddenWT = Matrix.transpose(this.layers[j + 1].weights);
          let hiddenErrors = hiddenWT.dot(this.layers[j + 1].error);

          current.error = hiddenErrors;

          let gradients = Matrix.map(current.value, d);
          gradients.multiply(current.error);
          gradients.multiply(this.learningRate);

          //Find deltaW
          let g = Matrix.transpose(this.layers[j - 1].value);
          let delta = gradients.dot(g);

          current.weights.add(delta);
          current.bias.add(gradients);
        }
      }
    }

    //Calulate the total error
    let sum = 0;
    for (let n in model.layers[max].error.data) {
      sum += Math.abs(Number(model.layers[max].error.data[n]));
    }
    return sum;
  }
}


class dense {
  constructor(config) {
    this.nodes = config.nodes;
    this.activation = config.activation;
    this.value = 0;
  }
}

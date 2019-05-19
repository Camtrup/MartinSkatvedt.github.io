const diagram1Div = document.getElementById("diagram1");
const submit      = document.getElementById("submit");
const fargeInput  = document.getElementById("fargeInput");
const verdiInput  = document.getElementById("verdiInput");

submit.onclick = () => diagram.nySøyle(verdiInput.value, fargeInput.value);

document.body.onclick = (n) => {
  if (n.target.classList == "søyle") n.target.parentNode.removeChild(n.target);
}

class Søylediagram {
  constructor(div, height) {
    this.søyler = [];
    this.div = div;
    this.div.className = "diagram";
    this.div.style.display = "flex";
    this.div.style.flexDirection = "row";

    this.max = 0;
    this.height = height;
    this.div.style.height = this.height;

  }

  nySøyle(verdi, farge) {
    if (verdi > this.max) this.max = verdi;
    this.søyler.push(new Søyle(verdi, farge, this.div));
    this.oppdater();
  }

  oppdater() {
    this.søyler.forEach((søyle) => {
      søyle.height = this.mapHeight(søyle.verdi);
      søyle.div.style.height = søyle.height + "px";
    });
  }
  mapHeight(verdi) {
    return (verdi * this.height) / (this.max);
  }
}


class Søyle {
  constructor(verdi, farge, parent) {
    this.farge = farge;
    this.verdi = verdi;
    this.div = document.createElement("div");
    this.div.classList = "søyle";
    this.height = 0;
    this.div.style.backgroundColor = this.farge;
    this.div.style.width = "100px";
    parent.appendChild(this.div);
  }
}


let diagram = new Søylediagram(diagram1Div, 400);

diagram.nySøyle(600, "red");
diagram.nySøyle(400, "grey");

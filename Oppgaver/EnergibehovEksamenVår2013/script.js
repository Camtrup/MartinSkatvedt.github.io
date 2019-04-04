const foodTable = document.getElementById("foodTable");
const outputContainer = document.getElementById("outputContainer");
let inputs = document.getElementsByClassName("antallInput");
let diagrams = document.getElementsByClassName("diagram");
let foods = [new Lettmelk, new Egg, new Grovbrød, new Smør, new Gulost];
let kcal = 0, totalProtein = 0, totalFett = 0, totalKarbohydrater = 0;
let windowWidth = window.innerWidth;
let inputsArray;
foods.forEach((food, i) =>  { //Henter klassene dynamisk
  let tr = document.createElement("tr");

  let name = document.createElement("td");
  let nameText = document.createTextNode(food.desc);
  name.appendChild(nameText);
  tr.appendChild(name);

  let kcal = document.createElement("td");
  let kcalText = document.createTextNode(food.kcal);
  kcal.appendChild(kcalText);
  tr.appendChild(kcal);

  let protein = document.createElement("td");
  let proteinText = document.createTextNode(food.protein);
  protein.appendChild(proteinText);
  tr.appendChild(protein);

  let fett = document.createElement("td");
  let fettText = document.createTextNode(food.fett);
  fett.appendChild(fettText);
  tr.appendChild(fett);

  let karbohydrater = document.createElement("td");
  let karbohydraterText = document.createTextNode(food.karbohydrater);
  karbohydrater.appendChild(karbohydraterText);
  tr.appendChild(karbohydrater);

  let input = document.createElement("input");
  input.className = "antallInput";
  input.type = "Number";
  tr.appendChild(input);

  foodTable.appendChild(tr);
  inputs = document.getElementsByClassName("antallInput");
  inputsArray = Array.from(inputs);
  inputsArray[i].onkeyup = () => updateDiagram();
});

const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function updateDiagram() {
  kcal = 0;
  totalProtein = 0;
  totalFett = 0;
  totalKarbohydrater = 0;

  inputsArray.forEach((input, i) => {
    kcal                 = foods[i].kcal          * input.value;
    totalProtein        += foods[i].protein       * input.value;
    totalFett           += foods[i].fett          * input.value;
    totalKarbohydrater  += foods[i].karbohydrater * input.value;
    diagrams[i].style.width = scale(kcal, 0, 3000, 0, windowWidth) + "px";
    diagrams[i].innerText = foods[i].desc + "\n Kcal: " + kcal.toFixed(2);
  });

  outputContainer.innerText =
  `Total protein: ${totalProtein.toFixed(2)}
  Total fett: ${totalFett.toFixed(2)}
  Total karbohydrater: ${totalKarbohydrater.toFixed(2)}`;
}
updateDiagram();

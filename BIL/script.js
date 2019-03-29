const inputFields = document.getElementsByClassName("inputField");
const calcBtn = document.getElementById("calculate");
const output = document.getElementById("output");

calcBtn.onclick = () => {
  let b = inputFields[0].value;
  let i = inputFields[1].value;
  let l = inputFields[2].value;

  if (b > 10 || b < 0 || i > 10 || i < 0 || l > 10 || l < 0) {
    alert("Verdier kan ikke være mindre enn 0 eller større enn 10!");
    return;
  }
  let f = b*i*l;
  output.innerText = f + "N";
}

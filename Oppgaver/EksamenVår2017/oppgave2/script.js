const sjekkButton = document.getElementById("sjekkButton");
const inputNumber = document.getElementById("inputNumber");
const output = document.getElementById("output");

sjekkButton.addEventListener("click", parseNumber);

const values = [
[0,0.2,0, "Stille"],
[0.3,1.5, 0, "Flau vind"],
[1.6,3.3,2, "Svak vind"],
[3.4, 5.4, 10, "Lett bris"],
[5.5, 7.9, 60, "Laber bris"],
[7,10.7, 150, "Frisk bris"],
[10.8, 13.8, 400, "Liten kuling"],
[13.9,17.1,500, "Stiv kuling"],
[17.2, 20.7, 0, "Sterk kuling"],
[20.8, 24.4, 0, "Liten storm"],
[24.5, 28.4, 0, "Full storm"],
[28.5, 32.6, 0, "Sterk storm"],
[32.7, 10000, 0, "Orkan"]];

let inputValue = 0;
function parseNumber() {
  inputValue = inputNumber.value;
  if (inputValue == "") inputValue = 0;
    for (value of values) {
      if (inputValue >= value[0] && inputValue <= value[1]) output.innerText =
      `Ved ${inputValue}m/s (${value[3]}) gir vindmølla ${(inputValue >= 2.5 && inputValue <= 15) ? value[2]: 0} watt i timen`;
    }
}

const inputValues = document.getElementsByClassName("inputValues");
let inputValuesArray = Array.from(inputValues);
for (let input of inputValuesArray) input.addEventListener("keyup", getData);

const outputs     = document.getElementsByClassName("outputs");
let outputsArray = Array.from(outputs);

const type = document.getElementsByClassName("type");
const typeArray = Array.from(type);

const totSpeed = document.getElementById("totSpeed");
const totWatt  = document.getElementById("totWatt");

let inputValue = 0;
let totalSpeed = 0;
let totalWatt  = 0;

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


function getData() {
  totalSpeed = 0;
  totalWatt  = 0;
  inputValuesArray.forEach((input, i) => {
    inputValue = input.value;
    if (inputValue == "") inputValue = 0.0;
    for (let value of values) {
        if (inputValue >= value[0] && inputValue <= value[1]) {
          if (inputValue >= 2.5 && inputValue <= 15.0) {
            totalWatt += Number(value[2]) * 6;
            outputsArray[i].innerText = value[2];
          }
          else outputsArray[i].innerText = 0;
          totalSpeed += Number(inputValue);

          typeArray[i].innerText = value[3];
        }
    }
  })
  totWatt.innerText = totalWatt;
  totSpeed.innerText = totalSpeed;
}

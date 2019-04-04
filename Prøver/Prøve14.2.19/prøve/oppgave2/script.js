const inputField    = document.getElementById("inputField");
const convertButton = document.getElementById("convertButton");
const output        = document.getElementById("output");

const toSEK = document.getElementById("toSEK");
const toGBP = document.getElementById("toGBP");
const toUSD = document.getElementById("toUSD");

const exSEK = 1.07, exGBP = 0.089, exUSD = 0.11;
let SEK = 0, GBP = 0, USD = 0;


convertButton.onclick = () => {
  let outString = "";
  let NOK = inputField.value;

  SEK = NOK * exSEK;
  GBP = NOK * exGBP;
  USD = NOK * exUSD;

  if (toSEK.checked) outString += `SEK: ${SEK.toFixed(2)} sek\n`;
  if (toGBP.checked) outString += `GBP: ${GBP.toFixed(2)} pund\n`;
  if (toUSD.checked) outString += `USD: ${USD.toFixed(2)} dollar\n`;

  if (outString.length <= 0) alert("Ingen valuta valgt");

  output.innerText = outString;
}

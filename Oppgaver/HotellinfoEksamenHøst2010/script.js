const hotelPicker = document.getElementById("hotelPicker");
const infoOut = document.getElementById("infoOut");
const hotelBilde = document.getElementById("hotelBilde");
const tempOut = document.getElementById("tempout");
const tempContainer = document.getElementById("tempContainer");
const tempDivs = document.getElementsByClassName("temp");
let tempDivsArray = Array.from(tempDivs);
hotelPicker.addEventListener("change", updateInfo);

hoteller.forEach((hotell, i) => {
  let option = document.createElement("option");
  let optionText = document.createTextNode(hotell.navn);
  option.appendChild(optionText);
  option.value = i;
  hotelPicker.appendChild(option);
})


function updateInfo() {
  let current = hoteller[Number(hotelPicker.value)];
  let maksTemp = -200, minTemp = 200, gTemp = 0;
  tempOut.innerText = "";
  createTableHeader();

  current.temp.forEach((temp, i) => {
    let tr = document.createElement("tr");
    let dag = document.createElement("td");
    let dagTekst = document.createTextNode(i + 2);
    dag.appendChild(dagTekst);
    let tempTd = document.createElement("td");
    let tempTdTekst = document.createTextNode(temp);
    tempTd.appendChild(tempTdTekst);
    tr.appendChild(dag);
    tr.appendChild(tempTd);
    tempOut.appendChild(tr);
    if (temp > maksTemp) maksTemp = temp;
    if (temp < minTemp) minTemp = temp;
    gTemp += temp;
  })

  gTemp /= (current.temp.length - 1);
  displayTemp(current.temp);
  let text =
  `tlf: ${current.tlf}
  e-mail: ${current.mail}
  Høyeste temp: ${maksTemp}
  Minste temp: ${minTemp}
  Gjennomsnittstemp: ${gTemp.toFixed(2)}`;
  infoOut.innerText = text;
  hotelBilde.src = current.bildesrc;
}

updateInfo();

function createTableHeader() {
  let tr = document.createElement("tr");
  let dagH = document.createElement("th");
  let tempH = document.createElement("th");
  let dagHTekst = document.createTextNode("Dag");
  let tempHTekst = document.createTextNode("Temperatur");
  dagH.appendChild(dagHTekst);
  tempH.appendChild(tempHTekst);
  tr.appendChild(dagH);
  tr.appendChild(tempH);
  tempOut.appendChild(tr);
}

function displayTemp(temps) {
  temps.forEach((temp, i) => {
    let div = tempDivsArray[i];
    div.innerText = "Dag: " + (i + 2) + "\n Temp: " + temp;
    div.style.height = Math.abs(temp * 10) +"px";
    if (temp >= 0) div.style.backgroundColor = "red";
    else div.style.backgroundColor = "lightblue";
  });
}

const table = document.getElementById("table");
const table2 = document.getElementById("table2");
const vinnerTekst = document.getElementById("vinnerTekst");
//blokk 0 = borgerlig
//blokk 1 = Rød-grønn
//blokk 2 = ikke i en blokk;

const data = [
  ["Rødt",  3.7,  2],
  ["SV",    5.0,  1],
  ["A",     23.0, 1],
  ["SP",    4.2,  1],
  ["MDG",   3.8,  2],
  ["KrF",   2.8,  0],
  ["V",     6.7,  0],
  ["H",     28.2, 0],
  ["FrP",   15.6, 0],
  ["Pir",   4.3,  2],
];


document.body.onkeyup = (key) => {
  if (key.target.classList == "inputField") data[key.target.id][1] = Number(key.target.value);
  console.table(data);
  calcData();
}
function fillTable() { //Fyller table1 med data
  for (i in data) {
    let tr = document.createElement("tr");

    let partiCelle = createTD(data[i][0]);
    tr.appendChild(partiCelle);

    let input = document.createElement("input");
    input.type = "Number";
    input.value = data[i][1];
    input.id = i;
    input.classList = "inputField";
    tr.appendChild(input);


    let tekst;
    if (data[i][2] ==  2) tekst = "ingen";
    if (data[i][2] ==  0) tekst = "Borgerlig";
    if (data[i][2] ==  1) tekst = "Rød-Grønn";
    let blokkCelle = createTD(tekst);
    tr.appendChild(blokkCelle);

    table.appendChild(tr);
  }
}

function calcData() { //regner ut data for hvem som har høyest oppslutning
  table2.innerHTML = "";
  let prosent = [["Borgerlige", 0],["Rød-Grønne",0],["Ingen",0]];
  for (let i in data) {
    prosent[data[i][2]][1] += data[i][1];
  }

  let maxProsent = 0;
  let vinner = "";
  for (let i in prosent) {
    let tr = document.createElement("tr");

    let blokkCelle = createTD(prosent[i][0]);
    let prosentCelle = createTD(prosent[i][1] + "%");

    tr.appendChild(blokkCelle);
    tr.appendChild(prosentCelle);
    table2.appendChild(tr);

    if (prosent[i][1] > maxProsent) {
      vinner = prosent[i][0];
      maxProsent = prosent[i][1];
    }

  }
  vinnerTekst.innerText = "De " + vinner + " har størst oppslutning";
}
function createTD(tekst) { //Funskjon for å lett legeg til elementer i en table
  let td = document.createElement("td");
  let TDtekst = document.createTextNode(tekst);
  td.appendChild(TDtekst);
  return td;
}



fillTable();
calcData();

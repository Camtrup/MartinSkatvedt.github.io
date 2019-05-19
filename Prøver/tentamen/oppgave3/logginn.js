const loggInnKnapp = document.getElementById("loggInn");
const loggInnPassord = document.getElementById("passord");
const loginContainer = document.getElementById("loginContainer");
const opptelling = document.getElementById("opptelling");
let table = document.createElement("table");
let correct = false;

let passwords =[
"",
"Passord001",
"Passord002",
"Passord003",
"Passord004",
"Passord005",
"Passord006",
"Passord007",
"Passord008",
"Passord009",
"Passord010"]

loggInnKnapp.onclick = () => {
  let inputPassword = loggInnPassord.value;
  passwords.forEach((password, i) => {
    if (password == inputPassword) {
      correct = true;
      passwords.splice(i, 1); //Sletter passord når den er brukt
    }
  })
  if (correct) displayStem(); //Korrekt passord, du kan nå stemme
  if (!(correct)) alert("Feil passord, prøv på nytt");
}

const partier = [
  ["Rødt",0],
  ["SV",0],
  ["A",0],
  ["SP",0],
  ["MDG",0],
  ["KrF",0],
  ["V",0],
  ["H",0],
  ["FrP",0],
  ["Pir",0],
];

const data2013 = [
  ["Rødt",  3.7],
  ["SV",    5.0],
  ["A",     23.0],
  ["SP",    4.2],
  ["MDG",   3.8],
  ["KrF",   2.8],
  ["V",     6.7],
  ["H",     28.2],
  ["FrP",   15.6],
  ["Pir",   4.3],
];

function displayStem() {
  table.style.display = "block";
  table.innerHTML = "";
  loginContainer.style.display = "none";
  table.id="stemmeTable"

  partier.forEach((parti, i) => {
    let tr = document.createElement("tr");
    tr.appendChild(createTableElement("td", parti[0]));
    tr.appendChild(createTableElement("button", "Stem!", i, "btn"));
    table.appendChild(tr);
  })
  document.body.appendChild(table);
}

function createTableElement(type, text, id, classList) { //Litt mer avansert enn i oppgave2, men lager elementer til table
  let elem = document.createElement(type);
  elem.id = id;
  elem.classList = classList;
  let textCell = document.createTextNode(text);
  elem.appendChild(textCell);
  return elem;
}

document.body.onclick = (click) => { //bekrefter stemmen din
  if (click.target.classList == "btn") {
    let valgt = partier[click.target.id][0];
    let answer = prompt(`For å stemme ${valgt}, skriv inn "${valgt}"`);
    if (valgt == answer) {
      alert("Stemme avgitt");
      partier[click.target.id][1]++;
      table.style.display = "none";
      loginContainer.style.display = "block";
    }
    else alert("Svar ikke avgitt, feil svar");
  }
}

opptelling.onclick = () => { //Går til opptelingsrutinen
  table.style.display = "block";
  loginContainer.style.display = "none";
  table.innerHTML = "";
  document.body.appendChild(table);
  let total = 0;

  for (let parti of partier) {
    total += parti[1];
  }

  let tr = document.createElement("tr");
  tr.appendChild(createTableElement("th", "Parti"));
  tr.appendChild(createTableElement("th", "Oppslutning"));
  tr.appendChild(createTableElement("th", "Oppslutning 2013"));
  tr.appendChild(createTableElement("th", "Differanse"));
  table.appendChild(tr);

  partier.forEach((parti, i) => {
    let tr = document.createElement("tr");
    parti[2] = prosent(parti[1], total);
    tr.appendChild(createTableElement("td", parti[0]));
    tr.appendChild(createTableElement("td", parti[2] + "%"));
    tr.appendChild(createTableElement("td", data2013[i][1] + "%"));
    let diff = parti[2] - data2013[i][1];
    tr.appendChild(createTableElement("td", diff + "%"));
    table.appendChild(tr);
  })
}

function prosent(verdi, total) { //regner ut prosent av en total
  if (verdi == 0) return 0;
  else return ((verdi/total) * 100);
}

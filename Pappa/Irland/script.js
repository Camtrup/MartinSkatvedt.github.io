let quizContainer   = document.getElementById("quizContainer");
let options         = document.getElementsByClassName("options");
let optionQuestion  = document.getElementsByClassName("optionQuestion");
let nextButton      = document.getElementById("nextButton");
let index = 0;
let nRette = 0;

let spm = [
["Hvor mange innbyggere er det i Irland?","ca. 4.8 millioner","ca. 6.5 millioner","ca. 2.7 millioner",0],
["Hvilke farger finner man i det irske flagget?","Grønn, Hvit, Rød","Grønn, Blå, Oransje","Grønn, Hvit, Oransje",2],
["Hvilke deler av Irland er underlagt Storbrittania","Nord-Irland","Irland","Begge",0]];

nextButton.addEventListener("click", nesteSPM);

function sjekkSPM() {
  let a = false;
  for (let i = 0; i < 3; i++) {
    if (options[i].checked) {
      a = true;
      if (spm[index][4] == i) nRette++;
    }
  }
  return (a) ? true : false;
}

function printSPM() {
  for (let i = 0; i < 4; i++) {
    optionQuestion[i].innerText = spm[index][i];
  }
}

function nesteSPM() {
  if (sjekkSPM()) index++;
  else {
    alert("Husk å svare :)");
    return;
  }

  if (index <= spm.length -1) printSPM();
  else {
    quizContainer.innerText = "";
    quizContainer.innerText =
    `Du fikk ${nRette}/3 rette`;
    if (nRette >= 2) alert("Gratulerer, neste link er 'SkattenErIkkeHer'");
    else alert("Du må ha minst 2 rette for å komme deg videre");
  }
}

printSPM();


function nameClick() {
  console.log("Jeg heter Martin!");
}

function sumbitClick() {
  let høyde = Number(document.getElementById("h").value);
  let bredde = Number(document.getElementById("b").value);
  let arial = høyde * bredde;
  let omkrets = (høyde * 2) + (bredde* 2);

  if(isNaN(omkrets) || isNaN(bredde)) {
    alert("Data må kun være tall!")
  }
  else {
    alert(`Arialet er ${arial}, og omkretsen er ${omkrets}`);
  }
}

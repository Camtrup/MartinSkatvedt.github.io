let arial, omkrets;

function nameClick() {
  console.log("Jeg heter Martin!");
}

function sumbitClick() {
  let høyde = document.getElementById("h").value
  let bredde = document.getElementById("b").value


  arial = kalkArial(høyde, bredde);
  omkrets = kalkOmkrets(høyde, bredde);

  if(isNaN(omkrets) || isNaN(bredde)) {
    alert("Data må kun være tall!")
  }
  else {
    alert(`Arialet er ${arial}, og omkretsen er ${omkrets}`);
  }
}

function kalkArial(høyde, bredde) {
  return (høyde * bredde);
}

function kalkOmkrets(høyde, bredde) {
  return ((høyde * 2) + (bredde* 2));
}

const picHolder = document.getElementById("picHolder");
const displayHolder = document.getElementById("displayHolder");
const MDGlyd  = new Audio("./vedlegg/piano.mp3");
let currentIndex = 0;
let MDGimg = document.createElement("img");
let interval;
const bilder = ["./vedlegg/ap.png","./vedlegg/frp.jpg",
"./vedlegg/hoyre.png","./vedlegg/krf.jpg","./vedlegg/piratpartiet.png", "./vedlegg/raudt.png",
"./vedlegg/sp.png", "./vedlegg/sv.jpg", "./vedlegg/miljopartiet.png", "./vedlegg/venstre.png"];

let imgWidth = (window.innerWidth/bilder.length) - 6;

bilder.forEach((bilde, i) => { //Looper gjennom alle bildene og viser dem på siden
  let img = document.createElement("img");
  img.src = bilde;
  img.style.width = imgWidth+ "px";
  img.classList = "bildeElement";
  img.id = i;
  picHolder.appendChild(img);
});


document.body.onclick = (n) => { //sjekker hvilket bilde man trykker på
  let obj = n.target.id;

  if (obj == 8) mdg();
  else if (obj == 6) sp();
}


function sp() { //Viser SP video
  clearInterval(interval); //Sletter tidligere intervaller slik at det ikke blir mer enn 1 interval
  MDGlyd.pause(); //Setter lyd på pause
  displayHolder.innerHTML = "";
  let vid = document.createElement("video");
  vid.src = "./vedlegg/senterpartiet.mp4"
  displayHolder.appendChild(vid);
  vid.id = "SPvideo";
  vid.controls = true;
  vid.play();
}


function mdg() { //Viser MDG slideshow
  clearInterval(interval); //Sletter tidligere intervaller slik at det ikke blir mer enn 1 interval
  displayHolder.innerHTML = "";
  displayHolder.appendChild(MDGimg);
  nextImg();
  MDGlyd.play(); //Starter sang
  MDGlyd.loop = "true"; //Looper sang
  interval = setInterval(nextImg, 2000); //Setter intervall med 2000ms til funskjonen nextIMG
}


function nextImg() { //Funksjon som bytter bilde til MDGslideshowen
  if (currentIndex > 2) currentIndex = 0;
    const template = "./vedlegg/bildegalleri0";
    MDGimg.src = template + currentIndex + ".png";
    currentIndex++;
}

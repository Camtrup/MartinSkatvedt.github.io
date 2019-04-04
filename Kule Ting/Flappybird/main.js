const name = document.getElementById("name");
const pushButton = document.getElementById("pushButton");
const rankNames = document.getElementsByClassName("rankNames");
const rankScore = document.getElementsByClassName("rankScore");

const spawnRate = 80;
const config = {
    apiKey: "AIzaSyCr2aRnS6M9gpbczZEHN8s8AjStZQz0674",
    authDomain: "flappystalin-684fb.firebaseapp.com",
    databaseURL: "https://flappystalin-684fb.firebaseio.com",
    projectId: "flappystalin-684fb",
    storageBucket: "",
    messagingSenderId: "269698149552"
};
firebase.initializeApp(config);
let db = firebase.database();
let highscoreRef = db.ref("highscores");

let pipes = [];
let bird;
let backgroundIMG, pipeIMG, pipeRotateIMG, song, flappyImage;
let active = true, del = false, running = false;
let score = 0, highscore = 0;
let entries;

pushButton.onclick = () => {
  if (highscore > 0 && name.value != "" && confirm("Sikker på at du vil sende?"))highscoreRef.push({navn: name.value, highscore: highscore});
  else alert("Navn kan ikke være tomt, og highscore må være mer enn 0");
  highscoreRef.once('value', gotData, (err) => console.error(err));
}

function preload() {
  backgroundIMG = loadImage("./img/flag.png");
  pipeIMG       = loadImage("./img/pipe.png");
  pipeRotateIMG = loadImage("./img/pipeRotate.png");
  flappyImage   = loadImage("./img/Stalin.png");
  song          = new Audio("./img/song.mp3");
  highscore = Number(window.localStorage.getItem("highscore"));
  highscoreRef.once('value', gotData, (err) => console.error(err));
}
function gotData(data) { //Array manipulering for å legge til liste i table
  entries = (Object.keys(data.val()));
  let objects = [];
  for (let key of entries) {objects.push(data.val()[key]);}
  let a = (objects.sort((a,b) => a.highscore - b.highscore));
  let j = 0;
  for (let i = objects.length - 1; i > objects.length - 6; i--) {
    rankScore[j].innerText = objects[i].highscore;
    rankNames[j].innerText = objects[i].navn;
    j++;
  }
}

function setup() {
  createCanvas(400,500);
  frameRate(100);
  bird = new Bird(); //Opretter fugl
}

function draw() {
  image(backgroundIMG, 0, 0,width, height); //Setter bakgrunnsbilde
  textSize(25);
  textAlign(CENTER);
  text("Score: " + score, 75, 40);
  text("Highscore: " + highscore, 300, 40);

  if (!active) {
    bird.update(); //Oppdater data for fuglen
    bird.show();   //Tegner fulgen
    pipes.forEach((i,j) => { //Går gjennom hele arrayen med piper
      i.update(); //Oppdaterer hver pipe
      i.show(); //Viser hver pipe
      active = i.hit(bird.x, bird.y, bird.r, bird.r);
      //Bruker et bibliotek for å sjekke kollisjon, p5.collide2d, (funksjonen er i pipe-klassen)

      if (!(i.scored)) { //Sjekker om man allerede har gitt poeng for pipen
        if (bird.x > i.x + i.w){ //Har man passert pipen får mer poeng
          score++;
          i.scored = true; //Setter at man har gitt poeng for å passere pipen
        }
      }


      if (active) { //Treffer man en pipe er active true
        running = false;
        active = true;
        pipes = []; //Nullstiller pipene
        bird.velocity = 0; //Nullstiller y-farten
        if (score > highscore) {
          highscore = score;
          window.localStorage.setItem("highscore", highscore.toString()); //Lagrer ny highsore til localstorage
        }
        score = 0;
      }
      if (i.x + i.w < 0) del = true; //Fjerner pipen hvis den er utenfor canvaset
    })
    if (frameCount % spawnRate == 0) pipes.push(new Pipe); //Genererer ny pipes avhengig av spawnRaten
    if (del) { //Hvis man skal slette pipen gjør man det her, gjør det slik for å unngå en bug
      pipes.shift();
      del = false;
    }
  }

  if (active && !running) { //Hvis man har truffet noe og spiller ikke kjører, bare vis fuglen
    bird.update();
    bird.y = height / 2;
    bird.show();
  }
}

function keyPressed(key) { //Trykker man på space hopp, eller/og start spillet på nytt
  if (key.code == "Space" && !(running)) {
    running = true;
    active = false;
    //song.play();
  }
  if (key.code == "Space" && running) bird.jump();
}

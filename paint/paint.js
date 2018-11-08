const canvas            = document.getElementById("canvas");
const ctx               = canvas.getContext("2d");

const colorSelector     = document.getElementById("colorSelector");
const colorSelectorOut  = document.getElementById("colorSelectorOut");
const rSlider           = document.getElementById("rSlider");
const rSliderOut        = document.getElementById("rSliderOut");

let rect = canvas.getBoundingClientRect();
let mousePressed = false;


let config = {
    apiKey: "AIzaSyDECYdPlvwZyjUJIp0-Z1AU1MKtXTzk7PM",
    authDomain: "paint-8d21d.firebaseapp.com",
    databaseURL: "https://paint-8d21d.firebaseio.com",
    projectId: "paint-8d21d",
    storageBucket: "",
    messagingSenderId: "512125390861"
  };
firebase.initializeApp(config);
let database = firebase.database();
let ref = database.ref("image");


colorSelector.onchange = () => colorSelectorOut.innerText = colorSelector.value;
rSlider.onchange       = () => rSliderOut.innerText = rSlider.value + "px";

canvas.onmousedown = () => mousePressed = true;
canvas.onmouseup   = () => mousePressed = false;


canvas.addEventListener("mousemove", (click) => {
  if (mousePressed) {
    let x = click.clientX - rect.left, y = click.clientY - rect.top;
    let color = colorSelector.value;
    let r = rSlider.value;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    let obj = {
      x: x,
      y: y,
      color: color,
      r: r
    };


    let pix = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    //colorToHex(pix);


    console.log(rgbToHex());
    //sendData(data);
  }
});

async function sendData(data) {
  ref.push(data)
  .then(() => console.log("sent"))
  .catch((error) => console.log(error.message));
}


function colorToHex(pixler) {
  let len = canvas.width * canvas.height;
  let arr = new Array(len);

  for (let i = 0; i < len; i++) {
    arr[i] = rgbToHex()
  }
}

function rgbToHex(rgb) {
  for (let i = 0; i < 3; i++) {
    let hex = Number(rgb).toString(16);if (hex.length < 2) {
         hex = "0" + hex;
    }
    
  }

  return hex;
};

const rocket = document.getElementById("rocket");
const launch = document.getElementById("launch");

let places = ["../vedlegg/earth.png","../vedlegg/moon.png"];

document.body.style.backgroundImage = "url(" + places[0] + ")";
rocket.style.left = "640px";
rocket.style.top = "244.5px";

let place = 0;

let toMoon = [
  {transform: "rotate(0deg)",  top:"244.5px", left: "640px", opacity: 1},
  {transform: "rotate(0deg)",  top:"144.5px", left: "640px", opacity: 1},
  {transform: "rotate(70deg)", top:"144.5px", left: "640px", opacity: 1},
  {transform: "rotate(70deg)", top:"144.5px", left: "100%",  opacity: 0},

  {transform: "rotate(70deg)", top:"244.5px", left: "0px",   opacity: 0},
  {transform: "rotate(70deg)", top:"144.5px", left: "250px", opacity: 1},
  {transform: "rotate(0deg)",  top:"144.5px", left: "250px", opacity: 1},
  {transform: "rotate(0deg)",  top:"300px",   left: "250px", opacity: 1},
];

let fromMoon = [
  {transform: "rotate(0deg)",   top:"300px",   left: "250px", opacity: 1},
  {transform: "rotate(0deg)",   top:"144.5px", left: "250px", opacity: 1},
  {transform: "rotate(-70deg)", top:"144.5px", left: "250px", opacity: 1},
  {transform: "rotate(-70deg)", top:"144.5px", left: "0px",   opacity: 0},

  {transform: "rotate(-70deg)", top:"144.5px", left: "100%",  opacity: 0},
  {transform: "rotate(-70deg)", top:"144.5px", left: "640px", opacity: 1},
  {transform: "rotate(0deg)",   top:"144.5px", left: "640px", opacity: 1},
  {transform: "rotate(0deg)",   top:"244.5px", left: "640px", opacity: 1},
];


launch.onclick = () => {
  if (place == 0) {
    document.body.style.backgroundImage = "url(" + places[0] + ")";
    rocket.animate(toMoon, 5000);
    rocket.style.left = "250px";
    rocket.style.top = "300px";
    setTimeout(() => document.body.style.backgroundImage = "url(" + places[1] + ")", 2500);
    place = 1;
  }
  else {
    document.body.style.backgroundImage = "url(" + places[1] + ")";
    rocket.animate(fromMoon, 5000);
    rocket.style.left = "640px";
    rocket.style.top = "244.5px";
    setTimeout(() => document.body.style.backgroundImage = "url(" + places[0] + ")", 2500);
    place = 0;
  }
}

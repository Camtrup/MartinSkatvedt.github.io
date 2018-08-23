

function buttonClick() {
  fetch("https://cors-anywhere.herokuapp.com/http://worldclockapi.com/api/json/utc/now")
  .then(response => response.json())
  .then(function(myJson) {
    let text = myJson.dayOfTheWeek;
    console.log(`Today is: ${text}`);
    document.getElementById('para').innerText = text;
  });

}

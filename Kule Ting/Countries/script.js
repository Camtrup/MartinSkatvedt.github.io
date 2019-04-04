//https://google-developers.appspot.com/chart/interactive/docs/gallery/geochart#configuration-options
const regions_div = document.getElementById("regions_div");
const options = {
  sizeAxis: { minValue: 0, maxValue: 1},
  colorAxis: {colors: ['#EEE8AA', '#87CEFA']},
  datalessRegionColor: '#EEE8AA',
  enableRegionInteractivity: true,
  legend: "none",
};

regions_div.style.width = "80%";
regions_div.style.height = "60%";

google.charts.load('current', {
  'packages':['geochart'],
  'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
  var data = google.visualization.arrayToDataTable([
    ['Country'],
    ['Germany'],
    ['United States'],
    ['France'],
    ['Qatar'],
    ['United Arab Emirates'],
    ['Oman'],
    ['Maldives'],
    ['Iran'],
    ['Sri Lanka'],
    ['Austria'],
    ['Bahrain'],
    ['India'],
    ['Syria'],
    ['Egypt'],
    ['Lebanon'],
    ['Saudi Arabia'],
    ['Jordan'],
    ['Turkey'],
    ['Greece'],
    ['Slovenia'],
    ['Czech republic'],
    ['Slovakia'],
    ['Hungary'],
    ['Poland'],
    ['Italy'],
    ['Jordan'],
    ['Denmark'],
    ['Sweden'],
    ['Norway'],
    ['Vietnam'],
    ['Monaco'],
    ['Portugal'],
    ['Bulgaria'],
    ['Croatia'],
    ['Australia'],
    ['Estonia'],
    ['Netherlands'],
    ['Albania'],
    ['Spain'],
    ['Switzerland'],
    ['United Kingdom'],
  ]);


  let chart = new google.visualization.GeoChart(regions_div);
  chart.draw(data, options);
}

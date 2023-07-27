const map = L.map('map').setView([0, 117.15], 10);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//JSON Data
const searchLayer = L.geoJSON(herbariumLocation, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.Species);
    // console.log(layer.bindPopup(feature.properties.Species))
  }
}).addTo(map);


//Control Search
const searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'Species'
});

let herba = map.addControl(searchControl);
// console.log(herbariumLocation.features[3].properties.Species)
// console.log(herba)
const map = L.map('map').setView([0, 117.15], 10);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//JSON Data
const searchLayer = L.geoJSON(herbariumLocation, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup(feature.properties.Species);
  }
}).addTo(map);


//Control Search
const searchControl = new L.Control.Search({
  layer: searchLayer,
  propertyName: 'Species'
});

map.addControl(searchControl);
// console.log(herbariumLocation.features[3].properties.Species)
// console.log(map)

// Event listener to access matched features after search
searchControl.on('search:locationfound', function(event) {
  const matchedFeature = event.layer.feature;
  const speciesHeading = document.getElementById('species-heading');
  const habitus = document.getElementById('habitus');
  const distribution = document.getElementById('distribution');
  const description = document.getElementById('description');
  const benefit = document.getElementById('benefit');


  speciesHeading.textContent = matchedFeature.properties.Species;
  habitus.textContent = matchedFeature.properties.Habitus;
  distribution.textContent = matchedFeature.properties.Distribution;
  description.textContent = matchedFeature.properties.Description;
  benefit.textContent = matchedFeature.properties.Manfaat;
});

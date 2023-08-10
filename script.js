function getInfoDOM(event){
	const matchedFeature = event.layer.feature;

	const images = document.getElementById('images')

	const speciesHeading = document.getElementById('species-heading');
	const habitus = document.getElementById('habitus');
	const distribution = document.getElementById('distribution');
	
	const description = document.getElementById('description');
	const ecology = document.getElementById('ecology');
	const benefit = document.getElementById('benefit');
	const collector = document.getElementById('collector');

	//SHOW INFOBAR
	document.querySelector('.add-form').classList.remove("flex")
	document.querySelector('.infobar').classList.add("flex")
	document.querySelector('.add').classList.remove("active")
	document.querySelector('.flora').classList.add("active")


	//CHANGE PROPERTIES
	images.src = matchedFeature.properties.Image

	speciesHeading.textContent = matchedFeature.properties.Species;
	habitus.textContent = matchedFeature.properties.Habitus;
	distribution.textContent = matchedFeature.properties.Distribution;

	description.textContent = matchedFeature.properties.Description;
	ecology.textContent = matchedFeature.properties.Ecology;
	benefit.textContent = matchedFeature.properties.Manfaat;
	collector.textContent = matchedFeature.properties.Kolektor;
}


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

// Open Infobar Overlay when click the marker
const marker = L.geoJSON(herbariumLocation,
	{
		onEachFeature: function(feature, layer) {
			layer.bindPopup(feature.properties.Species);
		}
	}).addTo(map)
	.addEventListener('click', function(event) {
		document.querySelector('.add-form').classList.remove("flex")
		document.querySelector('.infobar').classList.add("flex")
		document.querySelector('.add').classList.remove("active")
		document.querySelector('.flora').classList.add("active")

		getInfoDOM(event)

		event.target.openPopup();
	});

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
	getInfoDOM(event)
});

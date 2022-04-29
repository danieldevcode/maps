console.log("Load Ok")

// Map Latitud, Longitud, Zoom
const myMap = L.map('map').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
const marker = L.marker([0, 0]).addTo(myMap)

tiles.addTo(myMap)

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

navigator.geolocation.getCurrentPosition(success, error, options)

function success(pos) {
    let coordinates = pos.coords

    consoleReport(coordinates)

    // Render Current location
    document.getElementById("latitud").textContent += `${coordinates.latitude}`
    document.getElementById("longitud").textContent += `${coordinates.longitude}`
    document.getElementById("coordenada").textContent += `${coordinates.latitude},${coordinates.longitude}`

    // Marker in map
    marker.setLatLng([coordinates.latitude, coordinates.longitude])

    // Coordinates object
    let coordinatesObj = {
        "latitude": coordinates.latitude,
        "longitude": coordinates.longitude
    }
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
}

function coordinateSearch() {
    let latitude = document.getElementById("latitudInput").value
    let longitude = document.getElementById("longitudInput").value
    let coordinates = {
        "latitude": latitude,
        "longitude": longitude,
        "accuracy": ""
    }
    consoleReport(coordinates)
    marker.setLatLng([latitude, longitude])
}

function consoleReport(coordinates) {
    console.log(`
        Tu posicion actual es:
            Latitud : ${coordinates.latitude}
            Longitud: ${coordinates.longitude}
                Aproximadamente ${coordinates.accuracy} metros.`)
}

let geocoder = L.Control.Geocoder.nominatim();
if (typeof URLSearchParams !== 'undefined' && location.search) {
    var params = new URLSearchParams(location.search);
    var geocoderString = params.get('geocoder');
    if (geocoderString && L.Control.Geocoder[geocoderString]) {
        console.log('Geocoder en uso', geocoderString);
        geocoder = L.Control.Geocoder[geocoderString]();
    } else if (geocoderString) {
        console.warn('Geocoder no soportado', geocoderString);
    }
}

var control = L.Control.geocoder({
    query: 'Colima México',
    placeholder: 'Buscar aquí...',
    geocoder: geocoder
}).addTo(myMap);


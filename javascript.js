console.log("Load Ok")

// Map Latitud, Longitud, Zoom
const myMap = L.map('map').setView([0, 0], 1);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributors'
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, {attribution})
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

function coordinateSearch(){
    let latitude= document.getElementById("latitudInput").value
    let longitude= document.getElementById("longitudInput").value
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
console.log("Ok")

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let coordinates = pos.coords
  
    console.log('Tu posición actual es:')
    console.log(`Latitud : ${coordinates.latitude}`)
    console.log(`Longitud: ${coordinates.longitude}`)
    console.log(`Aproximadamente ${coordinates.accuracy} metros.`)
  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }
  
navigator.geolocation.getCurrentPosition(success, error, options)
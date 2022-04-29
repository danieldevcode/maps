function success(position) {
    let coordinates = position.coords
    console.log(coordinates)
}

function error(error) {
    console.warn(`Error(${error.code}):(${error.message})`)
}
navigator.geolocation.getCurrentPosition(success, error)
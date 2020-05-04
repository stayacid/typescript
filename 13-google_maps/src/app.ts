// Code goes here!
import axios from 'axios'

// const
const form = document.querySelector('form') !
const addressInput = document.getElementById('address') !as HTMLInputElement
// declare map
declare let L: any // how to add types?
const accessToken = 'pk.eyJ1Ijoic3RheWFjaWQiLCJhIjoiY2s5c3E4MzQyMTZuYTN1bjF6ZmZhcjR6eCJ9.pavpKKJa55ymtvKDC-tJvQ'
// type for response
type GeocodeResponce = {lat: number, lon: number}[]

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  axios.get<GeocodeResponce>(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search?q=${encodeURI(enteredAddress)}&format=json
  `)
  .then(response => {
    // save coords
    const coordinates: {
      lat: number;
      lon: number;
    } = {
      lat: 0,
      lon: 0
    }
    coordinates.lat = response.data[0].lat
    coordinates.lon = response.data[0].lon
    console.log(coordinates);

    // load map
    document.getElementById('map')!.innerHTML = ''
    var mymap = L.map('map').setView([coordinates.lat, coordinates.lon], 13);
    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    // add marker
    L.marker([coordinates.lat, coordinates.lon]).addTo(mymap)

  })
  .catch(err => console.log(err))
}

form.addEventListener('submit', searchAddressHandler)
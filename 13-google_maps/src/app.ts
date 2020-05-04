// Code goes here!
import axios from 'axios'

const form = document.querySelector('form') !
const addressInput = document.getElementById('address') !as HTMLInputElement

type GeocodeResponce = {lat: number, lon: number}[]

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  axios.get<GeocodeResponce>(`https://cors-anywhere.herokuapp.com/https://nominatim.openstreetmap.org/search?q=${encodeURI(enteredAddress)}&format=json
  `)
  .then(response => {
    const coordinates: {
      lat: number;
      lon: number;
    } = {
      lat: 0,
      lon: 0
    }
    coordinates.lat = response.data[0].lat
    coordinates.lon = response.data[0].lon
    console.log(response);
  })
  .catch(err => console.log(err))
}

form.addEventListener('submit', searchAddressHandler)
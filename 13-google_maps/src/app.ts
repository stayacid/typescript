// Code goes here!
import axios from 'axios'

const form = document.querySelector('form') !
  const addressInput = document.getElementById('address') !as HTMLInputElement

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value

  axios.get(`https://nominatim.openstreetmap.org/search${encodeURI(enteredAddress)}`)
  .then(response => console.log(response))
  .catch(err => console.log(err))
}

form.addEventListener('submit', searchAddressHandler)
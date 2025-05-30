import axios from 'axios'

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = countryName => {
  const request = axios.get(`${baseUrl}?q=${countryName}&APPID=${api_key}&units=metric`)
  console.log(`${baseUrl}?q=${countryName}&APPID=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }
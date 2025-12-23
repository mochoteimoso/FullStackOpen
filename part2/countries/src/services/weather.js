import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

const getWeatherForCapital = (capital) => {
  const request = axios.get(baseUrl, {
    params: {
        q: capital,
        appid: api_key,
        units: 'metric'
    }
  })
  return request.then(response => response.data)
}

export default { getWeatherForCapital }
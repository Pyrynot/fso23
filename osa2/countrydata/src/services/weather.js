import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const baseUrl = 
'https://api.openweathermap.org/data/2.5/weather'


const getWeather = (lat, lon) => {
  console.log({api_key})
  const request = axios.get(baseUrl, {
    params: {
        lat,
        lon,
        appid: api_key,
        units: 'metric'
    }
  })

  return request.then(response => response.data)
}

export default { getWeather }
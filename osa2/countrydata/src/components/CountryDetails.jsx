import weatherService from '../services/weather'
import { useState, useEffect } from 'react'

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await weatherService.getWeather(
          country.capitalInfo.latlng[0], 
          country.capitalInfo.latlng[1]
          )
        setWeatherData(response);
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }

    fetchWeatherData()
  }, [country.latlng])



  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Official Name: {country.name.official}</p>
      <p>Capital: {country.capital}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      {weatherData && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {weatherData.main.temp} Celsius</p>
          <p>weather description: {weatherData.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
          <p>wind: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetails
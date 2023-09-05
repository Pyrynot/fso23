import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'

const App = () => {

  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    console.log('effect');
    countryService.getAll().then((countries) => {
      setAllCountries(countries);
      console.log(countries)
    })
  }, [])

  

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);

    if (event.target.value) {
      const filteredCountries = allCountries.filter((country) =>
        typeof country.name.common === 'string' &&
        country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
      )
      setCountries(filteredCountries)
      if (filteredCountries.length === 1) {
        setSelectedCountry(filteredCountries[0])
      } else {
        setSelectedCountry(null) // tyhjäksi jos monta maata
      }
    } else {
      setCountries([])
      setSelectedCountry(null) // tyhjäksi jos haku tyhjä
    }
  }

    

  


  return (
    <div>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : countries.length > 10 ? (
        <p>Too many matches</p>
      ) : (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>
                show
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}


export default App
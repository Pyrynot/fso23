import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import CountryDetails from './components/CountryDetails'

const App = () => {

  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

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
      setCountries(filteredCountries);
    } else {
      setCountries([])
    }
  }


  return (
    <div>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      {countries.length > 10 ? (
        <p>Too many matches, please make your query more specific.</p>
      ) : countries.length === 1 ? (
        <div>
          <CountryDetails country={countries[0]} />
        </div>
      ) : (
        
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </div>
  )
}


export default App
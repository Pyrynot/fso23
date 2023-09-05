

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Official Name: {country.name.official}</p>
      <p>Capital: {country.capital.join(', ')}</p>
      <strong>languages:</strong>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  )
}

export default CountryDetails
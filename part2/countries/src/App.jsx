import { useState, useEffect } from 'react'
import axios from 'axios'
import countriesService from './services/countries'

const FilterCountries = ({ value, onChange}) => {
  return (
    <div>
    find countries
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <b>Capital:</b> {country.capital} <br/>
      <b>Area:</b> {country.area}
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang =>
          <li key={lang}>
            {lang}
          </li>
        )}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

const Countries = ({ countriesToShow, handleShowDetails }) => {
  return (
    <div>
      {countriesToShow.map(country =>
        <li key={country.cca3}>
          {country.name.common} {"  "}
          <button
            onClick={() => handleShowDetails(country.cca3)}>
            Show
          </button>
        </li>
      )}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [countryToShow, setCountryToShow] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setCountryToShow(null)
  }

  const handleShowDetails = (cca3) => {
    const country = countries.find(c => c.cca3 === cca3)
    setCountryToShow(country)
  }


  return (
    <div>
      <FilterCountries
        value={filter}
        onChange={handleFilterChange}
        />
      
      {countryToShow && (
        <Country country={countryToShow} />
      )}

      {!countryToShow && (
        <>
          {countriesToShow.length === 1 && (
            <Country country={countriesToShow[0]} />
          )}

          {countriesToShow.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}

          {countriesToShow.length > 1 && countriesToShow.length <= 10 && (
            <Countries
              countriesToShow={countriesToShow}
              handleShowDetails={handleShowDetails} 
            />
           )}
        </>
      )}
    </div>
  )
}

export default App
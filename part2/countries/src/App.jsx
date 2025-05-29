import { useState, useEffect } from 'react'
import Countries from "./components/Countries";
import Country from "./components/CountryBasic";
import Filter from "./components/Filter";
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState("");

    // Get countries from api
    useEffect( () => {
      countryService
        .getAll()
        .then(allCountries => {
          console.log('promise fulfilled, data fetched from server')
          setCountries(allCountries)
        })
    }, [])

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value);
  }

  const handleFilterReset = () => {
    setNewFilter("");
  }

  const handleShow = (countryName) => {
    console.log(`pressed show button of ${countryName}`)
  }

  return (
    <div>
      {/* Header */}
      <h2>Countries App</h2>

      {/* filter countries by name */}
      <Filter value={newFilter} onChange={handleFilterChange}/>

      {/* Countries */}
      <Countries 
        countries={countries} 
        newFilter={newFilter}
        onFilterReset={handleFilterReset}
      />

    </div>
  )
}

export default App

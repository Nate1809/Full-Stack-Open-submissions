import { useState, useEffect } from 'react'

import weatherService from '../services/weather'

const CountryFull = ( {country, handleBack} ) => {

    const [weather, setWeather] = useState(null)

    // Get countries from api
    useEffect( () => {
        weatherService
            .getWeather(country.name.common)
            .then(curWeather => {
                console.log('promise fulfilled, weather fetched from server')
                setWeather(curWeather)
            })
    }, [])

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            {/* Languages */}
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}> {language} </li>
                ))}
            </ul>
            {/* Flag */}
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
            
            {weather ? (
                <div>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Loading weather...</p>
            )}
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    )
}

export default CountryFull
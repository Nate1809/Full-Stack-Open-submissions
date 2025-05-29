const CountryFull = ( {country, handleBack} ) => {
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
            <div><button onClick={handleBack}>Back</button></div>
        </div>
    )
}

export default CountryFull
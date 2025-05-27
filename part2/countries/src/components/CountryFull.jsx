const CountryFull = ( {country} ) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital: {country.capital}
            {/* Languages */}
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}> {language} </li>
                ))}
            </ul>
            {/* Flag */}
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
        </div>
    )
}

export default CountryFull
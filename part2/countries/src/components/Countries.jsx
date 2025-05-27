import CountryBasic from "./CountryBasic"; 
import CountryFull from "./CountryFull";

const Countries = ( {countries, newFilter, handleShow} ) => {
    const countriesToShow = newFilter === ""
        ? countries
        // if condition is true we add to list
        : countries.filter(country => 
            country.name.common.toLowerCase().includes(newFilter.toLowerCase())
        )

    // Handle different display options

    if (countriesToShow.length === 1) {
        console.log(countriesToShow[0])
        return (
            <CountryFull country={countriesToShow[0]}/>
        )
    } else if (countriesToShow.length <= 10) {
        return (
            <ul>
                {countriesToShow.map((country) => (
                    <CountryBasic key={country.name.common} country={country} handleShow={handleShow}/>
                ))}
            </ul>
        )
    } else {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    
}

export default Countries
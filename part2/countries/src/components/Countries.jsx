import { useState } from "react";

import CountryBasic from "./CountryBasic"; 
import CountryFull from "./CountryFull";

const Countries = ( {countries, newFilter, onFilterReset} ) => {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const handleShow = (country) => setSelectedCountry(country);
    const handleBack = () => {
        setSelectedCountry(null);
        // Reset filter when going back from a filtered single country view
        if (newFilter !== "") {
            onFilterReset();
        }
    };

    const countriesToShow = newFilter === ""
        ? countries
        // if condition is true we add to list
        : countries.filter(country => 
            country.name.common.toLowerCase().includes(newFilter.toLowerCase())
        )

    // Display single country on show button click
    if (selectedCountry) {
        return <CountryFull country={selectedCountry} handleBack={handleBack}/>;
    }

    // Display different number of countries
    if (countriesToShow.length === 1) {
        setSelectedCountry(countriesToShow[0])
        return <CountryFull country={countriesToShow[0]} handleBack={handleBack}/>
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
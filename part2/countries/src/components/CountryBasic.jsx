const CountryBasic = ({country, handleShow}) => {
    return (
        <li>
            {country.name.common} <button onClick={() => handleShow(country.name.common)} > Show </button>
        </li>
    )
}

export default CountryBasic
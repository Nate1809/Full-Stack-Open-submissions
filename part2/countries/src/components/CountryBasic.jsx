const CountryBasic = ({country, handleShow}) => {
    return (
        <li>
            {country.name.common} <button onClick={() => handleShow(country)} > Show </button>
        </li>
    )
}

export default CountryBasic
import Number from "./Number"; 

const Persons = ( {persons, newFilter} ) => {
    const personsToShow = newFilter === ""
        ? persons
        // if condition is true we add to list
        : persons.filter(person => 
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        )

    return (
        <ul>
            {personsToShow.map((person) => (
                <Number key={person.id} person={person} />
            ))}
        </ul>
    )
}

export default Persons
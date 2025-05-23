import Number from "./Number"; 

const Persons = ( {persons, newFilter, handleDelete} ) => {
    const personsToShow = newFilter === ""
        ? persons
        // if condition is true we add to list
        : persons.filter(person => 
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        )

    return (
        <ul>
            {personsToShow.map((person) => (
                <Number key={person.id} person={person} handleDelete={handleDelete}/>
            ))}
        </ul>
    )
}

export default Persons
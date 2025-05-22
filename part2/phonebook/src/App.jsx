import { useState } from "react";
import Number from "./components/Number";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    };
    // Check if name already exists
    const personNames = persons.map((person) => person.name);
    if (personNames.includes(newName)) {
      console.log(`${newName} already in Phonebook`);
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // add new name to state
    setPersons(persons.concat(nameObject));
    // reset newName and newNUmber state
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value);
  }

  const personsToShow = newFilter === ""
    ? persons
    // if condition is true we add to list
    : persons.filter(person => 
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )

  return (
    <div>
      {/* Header */}
      <h2>Phonebook</h2>

      {/* filter contacts by name */}
      <Filter value={newFilter} onChange={handleFilterChange}/>

      {/* Form */}
      <h2>add a new</h2>

      {/* <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}

      <PersonForm 
        onSubmit={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      {/* Phonebook */}
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Number key={person.id} person={person} />
        ))}
      </ul>

      {/*  DEBUG SHOWW STATES */}
      <div>debug name state: {newName}</div>
      <div>debug number state: {newNumber}</div>

    </div>
  );
};

export default App;

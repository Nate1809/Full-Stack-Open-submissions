import { useState } from "react";
import Number from "./components/Number";

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: "Arto Hellas",
      number: "040-1234567"
    }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
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

  return (
    <div>
      {/* Header */}
      <h2>Phonebook</h2>

      {/* Form */}
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      {/* Phonebook */}
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Number key={person.name} person={person} />
        ))}
      </ul>

      {/*  DEBUG SHOWW STATES */}
      <div>debug name state: {newName}</div>
      <div>debug number state: {newNumber}</div>

    </div>
  );
};

export default App;

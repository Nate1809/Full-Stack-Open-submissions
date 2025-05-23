import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from './services/persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  // Get persons from json server
  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled, data fetched from server')
        setPersons(initialPersons)
      })
  }, [])

  // Form submit handler
  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
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

    // Add contact to backend server
    personService
      .create(contactObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
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

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      {/* Header */}
      <h2>Phonebook</h2>

      {/* filter contacts by name */}
      <Filter value={newFilter} onChange={handleFilterChange}/>

      {/* Form */}
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      {/* Phonebook */}
      <h2>Numbers</h2>

      <Persons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>

      {/*  DEBUG SHOWW STATES */}
      {/* <div>debug name state: {newName}</div>
      <div>debug number state: {newNumber}</div> */}

    </div>
  );
};

export default App;

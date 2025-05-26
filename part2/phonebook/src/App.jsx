import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null)


  // Get persons from json server
  useEffect( () => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled, data fetched from server')
        setPersons(initialPersons)
      })
  }, [])

  const showSuccessNotification = (message) => {
    setSuccessMessage(message)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  // Form submit handler
  const addContact = (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName,
      number: newNumber
    };
    // Check if name already exists and handle it
    const personNames = persons.map((person) => person.name);
    if (personNames.includes(newName)) {
      console.log(`${newName} already in Phonebook`);
      if( window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ){
        // update number in backend
        const existing_person = persons.find(n => n.name === newName)
        const changedPerson = { ...existing_person, number: newNumber }
        personService
          .update(existing_person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existing_person.id ? returnedPerson : person))
            // show notification
            showSuccessNotification(`Updated ${returnedPerson.name}'s number`)
            // reset states
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.error('Failed to update person:', error)
            alert('Failed to update contact. Please try again.')
          })
      }
      return;
    }

    // ELSE, Add contact to backend server
    personService
      .create(contactObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // show success notification
        showSuccessNotification(`Added ${returnedPerson.name}`)
        // Reset states
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
      <Notification message={successMessage} isError={false}/>

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

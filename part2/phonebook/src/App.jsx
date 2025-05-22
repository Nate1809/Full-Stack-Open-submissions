import { useState } from 'react'
import Number from './components/Number'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
    }
    // Check if name already exists
    const personNames = persons.map(person => person.name)
    if (personNames.includes(newName)) {
      console.log(`${newName} already in Phonebook`)
      alert(`${newName} is already added to phonebook`)
    } else {
      // add new name to state
      setPersons(persons.concat(nameObject))
      // reset newName state
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map(person =>
            <Number key={person.name} person={person} />
          )}
        </ul>
        
      <div>debug: {newName}</div>
    </div>
  )
}

export default App
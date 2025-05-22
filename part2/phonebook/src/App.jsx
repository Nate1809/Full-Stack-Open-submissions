import { useState } from 'react'
import Number from './components/Number'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          {/* need to add handler and prevent default */}
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
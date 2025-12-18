import { useState } from 'react'

const Person = ({ name }) => {
  return (
    <li> {name} </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameAlreadyExists = persons.some(
      person => person.name === newName
    )

    if (nameAlreadyExists) {
      alert(`${newName} is already added to phonebook`)
    }

    else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
            <Person key={person.name} name={person.name} />
        )}
    </div>
  )
}

export default App
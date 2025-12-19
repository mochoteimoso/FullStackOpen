import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const FilterContacts = ({ value, onChange}) => {
  return (
    <div>
    filter shown with
      <input
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name:
        <input
          value={newName}
          onChange={handleNameChange}
        />
       </div>
         <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
      </div>
      <div>
          <button type="submit">add</button>
      </div>
    </form>
  )
}

const Contact = ({person, onDelete }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => onDelete(person.id)}>
        delete
      </button>
    </li>
  )
}

const Contacts = ({ personsToShow, handleContactDelete }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Contact
          key={person.id}
          person={person}
          onDelete={handleContactDelete}
        />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])

  const handleContactDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(
            `the contact '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      p => p.name === newName)

    if (existingPerson) {
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
        return
      }

      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedContact = { ...existingPerson, number: newNumber }

        personsService
          .update(existingPerson.id, updatedContact)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === existingPerson.id ? returnedPerson : p))
            setNewName('')
            setNewNumber('')
        })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personsService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterContacts
        value={filter}
        onChange={handleFilterChange}
        />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}

      />
      <h3>Numbers</h3>
      <Contacts
        personsToShow={personsToShow}
        handleContactDelete={handleContactDelete}
      />
    </div>
  )
}

export default App
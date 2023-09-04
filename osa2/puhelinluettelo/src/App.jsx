import { useState, useEffect } from 'react'
import axios from 'axios'
import PhonebookList from './components/PhonebookList'
import PhonebookForm from './components/PhonebookForm'
import SearchInput from './components/SearchInput'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  

  const handleSearchChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      console.log(newName)
      alert(`${newName} is already added to the phonebook`)
      setNewName('')
      return
    }

    const nameObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber
    }

    setPersons(persons.concat(nameObject));
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PhonebookForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PhonebookList persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App


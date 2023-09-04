import { useState, useEffect } from 'react'
import PhonebookList from './components/PhonebookList'
import PhonebookForm from './components/PhonebookForm'
import SearchInput from './components/SearchInput'
import peopleService from './services/people'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    peopleService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  

  const handleSearchChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }



  const addName = (event) => {
    event.preventDefault()
  
    const existingPerson = persons.find((person) => person.name === newName)
  
    if (existingPerson) {
      const shouldUpdatePhoneNumber = window.confirm(
        `${newName} is already added, do you want to replace the number?`
      )
  
      if (shouldUpdatePhoneNumber) {
        const updatedPerson = { ...existingPerson, number: newNumber }
  
        peopleService
          .update(existingPerson.id, updatedPerson)
          .then((updatedData) => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === updatedData.id ? updatedData : person
              )
            )
  
            setNewName('')
            setNewNumber('')
          })
          
      } 
      
      else {
        // käyttäjä peruutti, älä tee mitään
      }
    } 
    
    else {
      // ei samaa nimeä
      const nameObject = {
        name: newName,
        number: newNumber,
      }
  
      peopleService
        .create(nameObject)
        .then((returnedName) => {
          setPersons(persons.concat(returnedName))
          setNewName('')
          setNewNumber('')
        })
    }
  }



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }



  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }



  const handleDelete = (id) => {
      peopleService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
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
      <PhonebookList persons={persons} newSearch={newSearch} handleDelete={handleDelete} />
    </div>
  )
}

export default App


import PhonebookEntry from './PhonebookEntry'


const PhonebookList = ({ persons, newSearch }) => {
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(newSearch.toLowerCase())
    )
  
    return (
      <ul>
        {filteredPersons.map((person) => (
          <PhonebookEntry
            key={person.id}
            name={person.name}
            number={person.number}
          />
        ))}
      </ul>
    )
  }

export default PhonebookList
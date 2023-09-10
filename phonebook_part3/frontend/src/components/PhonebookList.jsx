import PropTypes from 'prop-types';
import PhonebookEntry from './PhonebookEntry';

function PhonebookList({ persons, newSearch, handleDelete }) {
  // eslint-disable-next-line max-len
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <ul>
      {filteredPersons.map((person) => (
        <PhonebookEntry
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

PhonebookList.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  newSearch: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default PhonebookList;

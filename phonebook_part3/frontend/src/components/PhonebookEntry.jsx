import PropTypes from 'prop-types';

function PhonebookEntry({
  name, number, id, handleDelete,
}) {
  const confirmDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      handleDelete(id);
    }
  };

  // maybe bad practice to share id here and to PhonebookList?

  return (
    <li>
      {name}
      {' '}
      {number}
      <button type="button" onClick={confirmDelete}>Delete</button>
    </li>
  );
}

PhonebookEntry.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default PhonebookEntry;

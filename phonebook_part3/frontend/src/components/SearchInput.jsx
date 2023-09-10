import PropTypes from 'prop-types';

function SearchInput({ newSearch, handleSearchChange }) {
  return (
    <p>
      filter shown with
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
    </p>
  );
}

SearchInput.propTypes = {
  newSearch: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

export default SearchInput;

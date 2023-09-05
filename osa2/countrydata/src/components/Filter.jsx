const Filter = ({ newSearch, handleSearchChange }) => (
    <p>
      find countries
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
    </p>
  )

export default Filter
const SearchInput = ({ newSearch, handleSearchChange }) => (
    <p>
      filter shown with
      <input
        value={newSearch}
        onChange={handleSearchChange}
      />
    </p>
  )

export default SearchInput
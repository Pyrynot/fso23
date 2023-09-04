const PhonebookEntry = ({ name, number, id, handleDelete }) => {
  const confirmDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      handleDelete(id)
    }
  }

//maybe bad practice to share id here and to PhonebookList? 

  return (
    <li>
      {name} {number}
      <button onClick={confirmDelete}>Delete</button>
    </li>
  )
}

export default PhonebookEntry
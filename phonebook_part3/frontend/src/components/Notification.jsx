const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    const errorStyle = {
        color: 'red',
        fontstyle: 'italic',
        fontSize: 16
    }

    if (message === null) {
      return null
    }
    
    if (message.includes('ERROR')) {
        <div style={errorStyle}>
            {message}
        </div>
    }

        else { 
        return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }}


  
  export default Notification
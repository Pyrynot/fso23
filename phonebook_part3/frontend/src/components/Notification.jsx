import PropTypes from 'prop-types';

function Notification({ message }) {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  };

  const errorStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16,
  };

  if (message === null) {
    return null;
  }

  if (message.includes('ERROR')) {
    return (
      <div style={errorStyle}>
        {message}
      </div>
    );
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: null,
};

export default Notification;

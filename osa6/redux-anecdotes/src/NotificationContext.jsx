import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  if (!notificationAndDispatch) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return notificationAndDispatch
}

export const setNotification = (dispatch, message, seconds) => {
  dispatch({ type: 'SET', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR' })
  }, seconds * 1000)
}
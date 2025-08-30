import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.value
    case "CLEAR":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationText, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notificationText, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const textAndDispatch = useContext(NotificationContext)
  return textAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const textAndDispatch = useContext(NotificationContext)
  return textAndDispatch[1]
}

export default NotificationContext
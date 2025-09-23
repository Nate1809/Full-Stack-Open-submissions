import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice'
import blogReducer from './reducers/blogSlice'
import userReducer from './reducers/userSlice'
import usersReducer from './reducers/usersSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store
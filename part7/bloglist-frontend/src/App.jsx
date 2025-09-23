import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import { showNotificationWithTimeout } from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogSlice'
import { loginUser, logoutUser, initializeUser } from './reducers/userSlice'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const padding = {
    padding: 5
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(showNotificationWithTimeout('Logged in'))
    } catch (exception) {
      dispatch(showNotificationWithTimeout('Wrong username or password', true))
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  if (!user) {
    return (
      <div>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        <span style={padding}>{user.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Notification />

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
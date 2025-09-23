import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { showNotificationWithTimeout } from './reducers/notificationSlice'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogSlice'
import { loginUser, logoutUser, initializeUser } from './reducers/userSlice'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // hook to check local stored credentials
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
      // Show notification
      dispatch(showNotificationWithTimeout('Wrong username or password', true))
    }
  }




  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await dispatch(createBlog(blogObject))
      dispatch(showNotificationWithTimeout(`A new blog ${blogObject.title} by ${blogObject.author} added`))
    } catch (error) {
      console.error(error)
      dispatch(showNotificationWithTimeout('Blog creation failed', true))
    }
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

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={ blogFormRef }>
        <NewBlogForm
          createBlog={handleCreate}
        />
      </Togglable>
    )
  }

  const handleLike = async (likedBlog) => {
    try {
      await dispatch(likeBlog(likedBlog))
    } catch (error) {
      dispatch(showNotificationWithTimeout('Failed to update likes', true))
    }
  }

  const handleRemove = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)){
      try {
        await dispatch(deleteBlog(blogToRemove.id))
        dispatch(showNotificationWithTimeout(`Blog ${blogToRemove.title} by ${blogToRemove.author} removed`))
      } catch (exception) {
        dispatch(showNotificationWithTimeout('Failed to delete blog', true))
      }
    }
  }

  return (
    <div>
      {/*Header*/}
      <h2>blogs</h2>

      {/*Show notification*/}
      <Notification />

      {/*Login*/}
      {!user && loginForm()}

      {/*Show blogs*/}
      {user && <div>
        <p>{user.name} logged in <button onClick={ handleLogout }>logout</button></p>
        { blogForm() }
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        )}
      </div>
      }

    </div>
  )
}

export default App
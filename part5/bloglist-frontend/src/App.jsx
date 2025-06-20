import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from "./components/NewBlogForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blog from "./components/Blog";


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, isError: false})

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
      .then(sortedBlogs =>
      setBlogs( sortedBlogs )
    )
  }, [])

  // hook to check local stored credentials
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      // Saving token to the browser's local storage
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showNotification('Logged in')
    } catch (exception) {
      // Show notification
      showNotification('Wrong username or password', true)
    }
  }



  // Helper function for notifications
  const showNotification = (message, isError = false) => {
    setNotification({message, isError})
    setTimeout(() => {
      setNotification({message: null, isError: false})
    }, 5000)
  }

  const handleCreate = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)

      // The backend returns the creator only as an id, so add the full user
      // object so Blog can immediately determine ownership without a refresh.
      const blogWithUser = { ...newBlog, user }

      setBlogs(blogs.concat(blogWithUser))
      showNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (error) {
      console.error(error)
      showNotification('Blog creation failed', true)
    }
  }

  const loginForm = () => (
    <div>
      <h2>login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>

  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
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
    const updatedBlog = {
      ...likedBlog,
      likes: likedBlog.likes + 1
    }

    try {
      const returnedBlog = await blogService.update(updatedBlog, likedBlog.id)
      setBlogs(blogs.map(blog =>
        blog.id === likedBlog.id ? returnedBlog : blog
      ))
    } catch (error) {
      showNotification('Failed to update likes', true)
    }
  }

  const handleRemove = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}?`)){
      try {
        await blogService.remove(blogToRemove.id)
        setBlogs(blogs.filter(b => b.id !== blogToRemove.id))
        showNotification(`Blog ${blogToRemove.title} by ${blogToRemove.author} removed`)
      } catch (exception) {
        showNotification('Failed to delete blog', true)
      }
    }

  }

  return (
    <div>
      {/*Header*/}
      <h2>blogs</h2>

      {/*Show notification*/}
      <Notification message={notification.message} isError={notification.isError} />

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
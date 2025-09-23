import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import { Container, Navbar, Nav, Button, Form, Card } from 'react-bootstrap'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import BlogPost from './components/BlogPost'
import { showNotificationWithTimeout } from './reducers/notificationSlice'
import { initializeBlogs } from './reducers/blogSlice'
import { loginUser, logoutUser, initializeUser } from './reducers/userSlice'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login to Application</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                name="Username"
                placeholder="Enter username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                name="Password"
                placeholder="Enter password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
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
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/users">Users</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text className="me-3">
                {user.name} logged in
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Notification />
        <Routes>
          <Route path="/blogs/:id" element={<BlogPost />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<BlogList />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
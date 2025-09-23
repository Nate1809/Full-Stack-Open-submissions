import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Card } from 'react-bootstrap'

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: 0
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Add a New Blog</Card.Title>
        <Form onSubmit={addBlog}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              name="Title"
              placeholder="Enter blog title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              name="Author"
              placeholder="Enter author name"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={url}
              name="URL"
              placeholder="Enter blog URL"
              onChange={({ target }) => setUrl(target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm
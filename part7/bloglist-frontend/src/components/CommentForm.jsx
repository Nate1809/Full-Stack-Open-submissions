import { useState } from 'react'
import { Card, Form, Button, InputGroup } from 'react-bootstrap'

const CommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (comment.trim()) {
      onSubmit(comment)
      setComment('')
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add a Comment</Card.Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Form.Control
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Write a comment..."
            />
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CommentForm
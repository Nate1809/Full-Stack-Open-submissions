import { Card, ListGroup } from 'react-bootstrap'

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Comments</Card.Title>
          <Card.Text className="text-muted">No comments yet</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="mb-3">
      <Card.Header>
        <Card.Title className="mb-0">Comments ({comments.length})</Card.Title>
      </Card.Header>
      <ListGroup variant="flush">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>{comment}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}

export default Comments
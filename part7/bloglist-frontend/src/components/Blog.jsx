import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
            {blog.title}
          </Link>
        </Card.Title>
        <Card.Text className="text-muted">
          by {blog.author}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Blog
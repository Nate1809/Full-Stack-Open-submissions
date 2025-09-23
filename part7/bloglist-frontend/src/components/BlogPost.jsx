import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Card, Button, Badge } from 'react-bootstrap'
import { initializeBlogs, likeBlog, deleteBlog, loadComments, createComment } from '../reducers/blogSlice'
import { showNotificationWithTimeout } from '../reducers/notificationSlice'
import Comments from './Comments'
import CommentForm from './CommentForm'

const BlogPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    if (id) {
      dispatch(loadComments(id))
    }
  }, [dispatch, id])

  const blog = blogs.find(b => b.id === id)

  if (!blog) {
    return null
  }

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog))
    } catch (error) {
      dispatch(showNotificationWithTimeout('Failed to update likes', true))
    }
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(showNotificationWithTimeout(`Blog ${blog.title} by ${blog.author} removed`))
      } catch (exception) {
        dispatch(showNotificationWithTimeout('Failed to delete blog', true))
      }
    }
  }

  const handleComment = async (commentText) => {
    try {
      await dispatch(createComment(blog.id, commentText))
    } catch (error) {
      dispatch(showNotificationWithTimeout('Failed to add comment', true))
    }
  }

  const canShowRemove = user && blog.user && blog.user.username === user.username

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>
          <Card.Title className="mb-0">{blog.title}</Card.Title>
          <small className="text-muted">by {blog.author}</small>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <strong>URL: </strong>
            <a href={blog.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              {blog.url}
            </a>
          </div>

          <div className="mb-3">
            <Badge bg="primary" className="me-2">
              {blog.likes} likes
            </Badge>
            <Button variant="outline-primary" size="sm" onClick={handleLike}>
              👍 Like
            </Button>
          </div>

          <div className="mb-3">
            <small className="text-muted">
              Added by {blog.user ? blog.user.name : 'unknown'}
            </small>
          </div>

          {canShowRemove && (
            <div className="mb-3">
              <Button variant="danger" size="sm" onClick={handleRemove}>
                🗑️ Remove
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>

      <Comments comments={blog.comments} />
      <CommentForm onSubmit={handleComment} />
    </div>
  )
}

export default BlogPost
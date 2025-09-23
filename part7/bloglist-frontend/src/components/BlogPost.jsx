import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
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
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>
        added by {blog.user ? blog.user.name : 'unknown'}
      </div>
      {canShowRemove && (
        <div>
          <button onClick={handleRemove}>remove</button>
        </div>
      )}

      <Comments comments={blog.comments} />
      <CommentForm onSubmit={handleComment} />
    </div>
  )
}

export default BlogPost
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import { createBlog, likeBlog, deleteBlog } from '../reducers/blogSlice'
import { showNotificationWithTimeout } from '../reducers/notificationSlice'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

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

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={ blogFormRef }>
        <NewBlogForm
          createBlog={handleCreate}
        />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
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
  )
}

export default BlogList
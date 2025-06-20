import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, user, handleLike, handleRemove }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  // Show the button for deleting a blog post only if the blog post was added by the user.
  const canShowRemove = user && blog.user && blog.user.username === user.username

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} <button onClick={() => setDetailsVisible(false)}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button onClick={() => handleLike(blog) }>like</button></p>
        <p>{blog.author}</p>
        {canShowRemove && <button onClick={() => handleRemove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
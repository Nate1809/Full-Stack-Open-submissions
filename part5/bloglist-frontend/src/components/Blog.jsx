import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
      </div>
    </div>
  )
}

export default Blog
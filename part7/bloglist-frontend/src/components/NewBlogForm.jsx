import { useState } from 'react'
import PropTypes from 'prop-types'
// const NewBlogForm = ({ createBlog})

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
    <div>
      <h2>add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              placeholder="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              placeholder="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            url:
            <input
              type="text"
              value={url}
              name="URL"
              placeholder="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>

        </div>
        <button type="submit">create</button>
      </form>
    </div>

  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlogForm
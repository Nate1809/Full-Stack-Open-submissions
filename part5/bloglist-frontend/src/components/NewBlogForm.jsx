const NewBlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, handleCreate }) => (
  <div>
    <h2>add a new blog</h2>
    <form onSubmit={handleCreate}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>

)

export default NewBlogForm
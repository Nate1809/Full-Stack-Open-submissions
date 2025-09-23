import { useState } from 'react'

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="write a comment..."
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div>no comments</div>
  }

  return (
    <div>
      <h3>comments</h3>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
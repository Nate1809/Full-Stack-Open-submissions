import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer.js"
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    console.log('addAnecdote')
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    // display notification for 5 seconds
    dispatch(setNotification('you created an anecdote: ' + "'" + content + "'"))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
    )
}

export default AnecdoteForm
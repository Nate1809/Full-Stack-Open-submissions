import { useDispatch } from 'react-redux'
import { createAnecdote } from "../reducers/anecdoteReducer.js"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    console.log('addAnecdote')
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    )
}

export default AnecdoteForm
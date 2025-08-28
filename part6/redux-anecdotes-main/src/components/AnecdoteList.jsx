import {voteAnecdote} from "../reducers/anecdoteReducer.js";
import {useDispatch, useSelector} from 'react-redux'
import {modifyNotification} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
  // const anecdotes = useSelector(state => [...state].sort((a, b) => b.votes - a.votes))

  // get filtered anecdotes and sort by descending likes
  const anecdotes = useSelector(state => {
    const filter = state.filter || ''
    return [...state.anecdotes]
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => b.votes - a.votes)
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    // display notification for 5 seconds
    const anecdoteContent = anecdotes.find(n => n.id === id).content
    dispatch(modifyNotification('you voted ' + "'" + anecdoteContent + "'"))
    setTimeout(() => {
      dispatch(modifyNotification(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
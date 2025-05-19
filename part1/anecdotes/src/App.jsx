import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0, 
    3: 0, 
    4: 0, 
    5: 0, 
    6: 0, 
    7: 0, 
  })

  const increaseVote = (idx) => () => {
    console.log("Vote for quote ", idx, "increasing to ", votes[idx] + 1 )
    setVotes({ ...votes, [idx]: votes[idx] + 1 })
  }

  const increaseByOne = () => setSelected(selected + 1)

  const showRandomAnecdote = () => {
    // Generate a random index between 0 and anecdotes.length-1
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    console.log("Changing to quote # ", randomIndex)
    setSelected(randomIndex)
  }

  return (
    <div>

      <Anecdote
        text={anecdotes[selected]}
        numVotes={votes[selected]}
      />

      <Button
      text="vote"
      onClick={increaseVote(selected)}
      />
      <Button
      text="next anecdote"
      onClick={showRandomAnecdote}
      />
      
    </div>
  )
}

const Anecdote = ({text, numVotes}) => {
  return (
    <div>
      {text}
      <div>
      has {numVotes} votes
      </div>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <>
      <button onClick={onClick}>
        {text}
      </button>
    </>
    
  )
}

export default App
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (choice) => () => {
    if (choice === 'good'){
      console.log('clicked button 1')
      setGood(good + 1)
    } else if (choice === 'neutral'){
      console.log('clicked button 2')
      setNeutral(neutral + 1)
    } else {
      console.log('clicked button 3')
      setBad(bad + 1)
    }
  }


  return (
    <div>
      < Header />

      < Button
        onClick = {increaseByOne('good')}
        text = 'good'
      />
      < Button
        onClick = {increaseByOne('neutral')}
        text = 'neutral'
      />
      < Button
        onClick = {increaseByOne('bad') }
        text = 'bad'
      />

      < Statistics 
        good = {good}
        neutral = {neutral}
        bad = {bad}
      />


    </div>
  )
}

const Header = () => {
  return (
    <div>
      <h1> give feedback </h1>
    </div>
  ) 
}

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </>
  ) 
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>
        statistics
      </h1>
      <Stat
        text="good"
        counter={good}
      />
      <Stat
        text="neutral"
        counter={neutral}
      />
      <Stat
        text="bad"
        counter={bad}
      />
    </div>
    
  )
}

const Stat = ({text, counter}) => {
  return (
    <div>
      {text} {counter}
    </div>
  )
}

export default App
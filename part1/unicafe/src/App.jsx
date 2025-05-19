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
  const total = good + neutral + bad;
  const avg    = total ? (good - bad) / total : 0;      // common “score” formula
  const positivePct = total ? (good / total) * 100 : 0; // guard against ÷0

  if (!total) {
    // no feedback given yet
    return (
      <div>
        <h1>
        statistics
      </h1>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <h1>
        statistics
      </h1>

      <StatisticLine
        text="good"
        value={good}
      />
      <StatisticLine
        text="neutral"
        value={neutral}
      />
      <StatisticLine
        text="bad"
        value={bad}
      />
      <StatisticLine
        text="all"
        value={total}
      />
      <StatisticLine
        text="average"
        value={avg}
      />
      <StatisticLine
        text="positive"
        value={positivePct}
      />
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <div>
      {text} {value}
    </div>
  )
}

export default App
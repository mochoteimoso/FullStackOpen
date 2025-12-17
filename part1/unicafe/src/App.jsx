import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>
    {props.text}
    </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const total = good + neutral + bad
  const score = good - bad
  
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1> statistics </h1>
      <p>
        good {good} <br/>
        neutral {neutral} <br/>
        bad {bad} <br/>
        all {total} <br/>
        average {score / total} <br/>
        positive {good / total * 100} %
      </p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
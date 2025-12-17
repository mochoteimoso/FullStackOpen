import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>
    {props.text}
    </button>
)

const StatisticLine = (props) => {
  const {text, value} = props

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const total = good + neutral + bad
  const score = good - bad
  
  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
         <td>{score / total}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{good / total * 100} %</td>
      </tr>
    </table>
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
      <h1> statistics </h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>
    {props.text}
    </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [total, setTotal] = useState(0)
  const [score, setScore] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setScore(score + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setScore(score)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setScore(score - 1)
  }


  return (
    <div>
      <h1> give feedback </h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h1> statistics </h1>
        <p>
          good {good}
          <br/>
          neutral {neutral}
          <br/>
          bad {bad}
           <br/>
          all {total}
           <br/>
          average {score / total}
           <br/>
          positive {good / total * 100} %
        </p>
    </div>
  )
}

export default App
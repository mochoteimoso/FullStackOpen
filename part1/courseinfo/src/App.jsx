const Header = (props) => {
    return (
      <div>
        {props.course}
      </div>
    )
}

const Part = (props) => {
    return (
      <div>
        {props.part} {props.exercises}
      </div>
    )
}

const Content = (props) => {
    return (
      <div>
        <Part part ={props.part1.name} exercises ={props.part1.exercises}/>
        <Part part ={props.part2.name} exercises ={props.part2.exercises}/>
        <Part part ={props.part3.name} exercises ={props.part3.exercises}/>
      </div>
    )
}

const Total = (props) => {
    return (
      <div>
        Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
      </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <h1>
        <Header course={course} />
      </h1>
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} /> 
    </div>
  )
}

export default App
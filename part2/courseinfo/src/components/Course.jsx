const Header = (props) => {
    return (
      <div>
        {props.name}
      </div>
    )
}

const Part = ({ name, exercises }) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
}

const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part
            key={part.id}
            name={part.name}
            exercises ={part.exercises}
          />
        )}
      </div>
    )
}

const Total = ({ parts }) => {
  const total = 
    parts.reduce((sum, p) => sum + p.exercises, 0)
    return (
      <div>
        <b>total of {total} exercises</b>
      </div>
    )
}

const Course = ({ course }) => {

  return (
    <div>
      <h1>
        <Header name={course.name} />
      </h1>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/> 
    </div>
  )
}

export default Course
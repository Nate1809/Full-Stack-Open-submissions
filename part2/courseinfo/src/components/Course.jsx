
const Header = (props) => <h2>{props.course}</h2>

const Content = ({parts}) => (
  <div>
    {parts.map(part => 
      <Part key={part.id} part={part} />
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) => {

  const sum = parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <div>
      <strong>total of {sum} exercises</strong>
    </div>
  )   
}
  
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
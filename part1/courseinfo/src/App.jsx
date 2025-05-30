const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]

  return (
    <>
      <Part
        part={part1.name}
        exercises={part1.exercises}
      />
      <Part
        part={part2.name}
        exercises={part2.exercises}
      />
      <Part
        part={part3.name}
        exercises={part3.exercises}
      />
    </>
  )
}

const Part = (props) => {

  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Footer = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]

  return (
    <>
      <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
    </>
  )
}

export default App


function App() {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course= {course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
}


function Header({course}){
  return(<h1>{course}</h1>)
}
function Content({parts}){
  return(<>
    <Part part = {parts[0]['name']} exercises={parts[0]['exercises']} />
    <Part part = {parts[1]['name']} exercises={parts[1]['exercises']} />
    <Part part = {parts[2]['name']} exercises={parts[2]['exercises']} />
  </>)
}
function Part({part, exercises}){
  return(<p>
    {part} {exercises}
  </p>)
}
function Total({parts}){
  return(<>
    <p>Total {parts[0]['exercises'] + parts[1]['exercises'] + parts[2]['exercises']} </p>
  </>)
}

export default App;

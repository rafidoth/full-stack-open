function Course({course}) {
    return (
      <div>
        <Header course= {course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    );
  }
  
  
  function Header({course}){
    return(<h1>{course}</h1>)
  }
  
  function Content({parts}){
    const partItems = parts.map((part)=>{
      return(<Part key={part.id} partName = {part.name} exercise={part.exercises} />)
    })
    return(<>
        {partItems}
    </>)
  }
  function Part({partName, exercise}){
    return(<p>
      {partName} {exercise}
    </p>)
  }
  
  function Total({parts}){
    
    return(<>
      <p>Total {parts.reduce((acc,curr)=>{
        return acc + curr.exercises
      },0)} </p>
    </>)
  }

  export default Course
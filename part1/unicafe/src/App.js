import {useState} from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={e=> setGood(good+1)} text={'good'}/>
      <Button onClick={e=> setNeutral(neutral+1)} text={'neutral'}/>
      <Button onClick={e=> setBad(bad+1)} text={'bad'}/>
      
      <h1>statistics</h1>
      {(good || neutral|| bad)? <Statistics good={good} neutral={neutral} bad = {bad}/> : <p>No feedback given</p>}
      
    </>
  );
}
function Button({onClick, text}){
  return(
    <button onClick={onClick}>{text}</button>
  )
}
function Statistics({good,neutral,bad}){
  const calculateAll = (a,b,c)=>{
    return  a+b+c
  }
  const average = (a,b,c)=>{
    const all = calculateAll(a,b,c);
    if(all) return (a-c)/all
    else return 0;
  }
  const percentage = (a,b,c)=>{
    const all = calculateAll(a,b,c);
    if(all) return ((a/all)*100)
    else return 0;
  }

  return(
    <>
      <table>
        <tbody>
          <StatisticsLine text={'good'} value={good}/>
          <StatisticsLine text={'neutral'} value={neutral}/>
          <StatisticsLine text={'bad'} value={bad}/>
          <StatisticsLine text={'all'} value={calculateAll(good,neutral,bad)}/>
          <StatisticsLine text={'average'} value={average(good,neutral,bad)}/>
          <StatisticsLine text={'percentage'} value={percentage(good,neutral,bad)+'%'}/>
        </tbody>
      </table>
    </>
  )
}


function StatisticsLine ({text,value}){
  return(
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
export default App;

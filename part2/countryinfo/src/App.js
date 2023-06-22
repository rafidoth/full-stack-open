import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetails from "./components/CountryDetails";

function App() {
  const [value, setValue] = useState('')
  const [showedCountries, setShowedCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [country, setCountry] = useState({})
  const [countries, setCountries] = useState([])

  useEffect(()=>{
    const fetchData = async () =>{
      const response =  await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      const fetchedData = response.data.map((c)=>c.name.common)
      setCountries(fetchedData)
    } 

    fetchData();
  },[])
  
  useEffect(()=>{
    if(value!==''){
      const val = value.toLowerCase()
      const showedCountries_temp  = countries.filter((c)=>c.toLowerCase().includes(val))
      if(showedCountries_temp.length<=10){
        const showedItems = showedCountries_temp.map((item,i)=><li key={i}>{item} <button onClick = {()=> setSelectedCountry(item)}>show details</button> </li>)
        setShowedCountries(showedItems)
      }else{
        setShowedCountries(<p>Too many matches,specify another filter</p>) 
      }
    }else{
      setShowedCountries([])
    }
  },[value])

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries//api/name/${selectedCountry}`)
      setCountry(response)
    }
    if(value!==''){
      fetchData()
    }
  },[selectedCountry])

  

  return (
    <>
      <label>Find Countries </label>
      <input onChange={e=>setValue(e.target.value)}/>
      {showedCountries}
      <CountryDetails country={country}/>
    </>
  );
}




export default App;


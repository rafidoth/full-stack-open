import axios from "axios";
import { useEffect, useState } from "react";


function CountryDetails({country}) {
    const apiKey = process.env.REACT_APP_API_KEY
    const [weather, setWeather]= useState({
      temp : '',
      wind : '',
      icon : ''
    })
    
    useEffect(()=>{
        const fetchWeather =  async ()=>{
            if(Object.keys(country).length>0){
              const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${country.data.capital}&limit=5&appid=${apiKey}`)
              const lat = res.data[0].lat
              const lon = res.data[0].lon
              console.log(lat,lon);
              const wRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
              
              setWeather({
                temp : parseFloat((wRes.data.main.temp-273).toFixed(2)),
                wind : wRes.data.wind.speed,
                icon : wRes.data.weather[0].icon
              })
            }
        }
        fetchWeather()
        
    },[country])
    const Data = country.data
    if(Object.keys(country).length === 0 && country.constructor === Object){
      return <></>
    }else{
      return(<>
        <h1>{Data.name.common}</h1>
        <div>capital {Data.capital}</div>
        <div>area {Data.area}</div>
        Languages
        {Object.values(Data.languages).map((lang,i)=><li key={i}>{lang}</li>)}
        <img src={Data.flags.png}/>

        <h1>Weather in {Data.capital}</h1>
        <div>temperature {weather.temp} °C</div>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
        <div>wind {weather.wind} m/s</div>
      </>)
    }
  }
  

  export default CountryDetails;
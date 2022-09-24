import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'


function App() {

  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()


  useEffect(()=>{
    //Esta funcion se ejecuta cuando llega la informacion de la ubicacion
    const success = pos => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(obj);
    }
    //llamamos el api del navegador para acceder a la ubicacion
    navigator.geolocation.getCurrentPosition(success)
  },[])

    // --Vamos a realizar una peticion para obtener el clima

    useEffect(()=>{
      if(coords){
        const APIKEY='89d991a47e4bad6959346791d9ba1e31'
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
        axios.get(URL)
        .then(res =>{
            const celsius = (res.data.main.temp - 273.15).toFixed(0)
            const farenheit = (celsius * 9/5 + 32).toFixed(0)
            setTemperature({celsius,farenheit})
           setWeather(res.data)
          })
          
        .catch(err => console.log(err))
      }
      
    },[coords])
    

  return (
    <div className="App">
      {
        weather ?
        <WeatherCard  weather={weather} temperature = {temperature}/>
        :
        <Loading/>
      }

    </div>
  )
}

export default App

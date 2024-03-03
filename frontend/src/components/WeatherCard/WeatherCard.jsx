import React from 'react'
import "./WeatherCard.css"

const WeatherCard = ({data}) => {
    const weatherData = data        
    console.log(weatherData);
    return (
    <section className='container-fluid d-flex flex-column justify-content-center align-items-center mt-4'>
        <p className='m-0 weatherText'> {weatherData.temperatura}°C, {weatherData.nombreCiudad}, {weatherData.region}, {weatherData.pais}</p>
        <div>
            <img src={weatherData.icono} alt={weatherData.nombreCiudad} />
        </div>
    </section>
  )
}

export default WeatherCard
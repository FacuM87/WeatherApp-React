import { useState } from 'react'
import config from '../../config.js'
import "./Form.css"
import WeatherCard from '../WeatherCard/WeatherCard'


const Form = () => {
     
    const apiUrl= config.weather_api_url 
    const [ciudad, setCiudad] = useState("")
    const [loader, setLoader] = useState(false)
    const [weatherData, setData] = useState({
        nombreCiudad:"",
        pais:"",
        region:"",
        temperatura:"",
        sensTerm:"",
        texto:"",
        icono:""
    })

    const handleOnSubmit = async (e) => {
            e.preventDefault()
            setLoader(true)
    
            try {
                const response = await fetch(apiUrl+ciudad)
                const data = await response.json() 
                setData({
                    nombreCiudad:data.location.name,
                    pais:data.location.country,
                    region:data.location.region,
                    temperatura:data.current.temp_c,
                    texto:data.current.condition.text,
                    icono:data.current.condition.icon
                })
                setLoader(false)
            } catch (error) {
                console.log(error);    
                setLoader(false)
            }        
    }

    return (
        <main>
            <div className='cont d-flex flex-column justify-content-center align-items-center'>
                <section className='container-fluid d-flex flex-column justify-content-center align-items-center'>
                    <h1>My Weather App</h1>
                    <form onSubmit={handleOnSubmit} className='d-flex flex-column w-50 justify-content-center align-items-center'>
                        <input name='city' required type='text' className='mb-2 form-control text-center' placeholder='Enter a city or a country name' onChange={(e) => setCiudad(e.target.value)}></input>
                        
                        {!loader? (<button type='submit' className='btn btn-primary w-50'> Search </button>):(
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>)
                        }
                    </form>
                </section>
                {weatherData.nombreCiudad && <WeatherCard data={weatherData} />}
            </div>
        </main>
    )
}

export default Form
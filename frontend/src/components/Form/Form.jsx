import React, { useEffect, useState } from 'react'
import config from '../../config.js'
import "./Form.css"
import WeatherCard from '../WeatherCard/WeatherCard'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice.js'


const Form = () => {

    const dispatch = useDispatch()
     
    const apiUrl= config.weather_api_url //process.env.REACT_APP_API_URL
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

    // const checkSession = async () => {
    //     try {
    //         const fetchUrl = process.env.REACT_APP_API_SESSION_URL
    //          const response = await fetch (fetchUrl, {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json"},
    //         })
    //         const data = await response.json()
    //         console.log(data);
    //         const userData = {
    //             first_name: data.first_name,
    //             last_name: data.last_name,
    //             email: data.email,
    //             role: data.role
    //         };
    //         console.log(userData);
    //         dispatch(login(userData));

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    
    // useEffect(() => {
    //     checkSession()
    // }, [])

    return (
        <main>
            <div className='cont d-flex flex-column justify-content-center align-items-center'>
                <section className='container-fluid d-flex flex-column justify-content-center align-items-center'>
                    <h1>My Weather App</h1>
                    <form onSubmit={handleOnSubmit} className='d-flex flex-column w-50 justify-content-center align-items-center'>
                        <input name='city' required type='text' className='mb-2 form-control' placeholder='Enter a city name' onChange={(e) => setCiudad(e.target.value)}></input>
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
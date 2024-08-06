import React, { useEffect, useState } from 'react';
import config from '../../config.js';
import "./GeoLocation.css"
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userSlice.js';

const GeoLocationComponent = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()	

  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)

  const handleLoginModal = () => {
	(loginModal === false) ? setLoginModal(true) : setLoginModal(false)
  }
  const handleRegisterModal = () => {
	(registerModal === false) ? setRegisterModal(true) : setRegisterModal(false)
  }

  const logoutFunction = async() => {
	try {
		const fetchUrl = config.api_logout_url
		console.log("logout Url: ", fetchUrl);
		const response = await fetch(fetchUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
		if (response.ok){
			const data = await response.json()
			console.log(data)
			dispatch(logout())
			window.location.href = '/';
		}
		else {
			console.log("Could not logout")
		}
	} catch (error) {
		console.log(error);
	}
	
  }
  
  const [location, setLocation] = useState(null);
  const [geoData, setgeoData] = useState({
	nombreCiudad:"",
	pais:"",
	region:"",
	temperatura:"",
	sensTerm:"",
	texto:"",
	icono:""
  })

  useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
            console.error('Error getting geolocation:', error.message);
        }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
	}, []);

	useEffect(() => {
		const apiUrl = config.weather_api_url
		if (location) {
		const geolocation = `${location.latitude},${location.longitude}`;
		const apiUrlGeo = apiUrl+geolocation
		fetch(`${apiUrlGeo}#`)
		.then(response => {return response.json()})
		  .then(data => {
			setgeoData({
				nombreCiudad:data.location.name,
				pais:data.location.country,
				region:data.location.region,
				temperatura:data.current.temp_c,
				sensTerm:data.current.feelslike_c,
				texto:data.current.condition.text,
				icono:data.current.condition.icon
			})
		})
		  .catch(error => {
			console.error('Error:', error);
		  });
		}
	}, [location]);

  return (
    <header className='d-flex justify-content-between'>
		<div className='text-start'>
			{location && (
				<p><img src={geoData.icono} alt="icono"/>{geoData.temperatura}°C, {geoData.region}, {geoData.pais}</p>
			)}
		</div>
		{user.first_name ? (
			<div className='d-flex'>
				<div>
					<p className='welcome mt-2 me-3'>Welcome {user.first_name}!</p>
				</div>
				<button className='logoutBtn me-2 p-0' onClick={logoutFunction}> Logout </button>
			</div>
			) : (
			<div className='me-3'>
				<button className='loginButton mt-2 me-2' onClick={handleLoginModal}> Login </button>
				<button className='registerButton' onClick={handleRegisterModal}> Register </button>
				{loginModal && <LoginModal closeModal = {setLoginModal} openRegisterModal = {setRegisterModal}/>}
				{registerModal && <RegisterModal closeModal = {setRegisterModal} openLoginModal = {setLoginModal}/>}		
			</div>		
			)
		}
    </header>
  );
};

export default GeoLocationComponent;

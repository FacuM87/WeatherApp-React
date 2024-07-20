import React, { useEffect, useState } from 'react';
import "./GeoLocation.css"
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';

const GeoLocationComponent = () => {
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
  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [sessionRunning, setSessionRunning] = useState(false)

  const handleLoginModal = () => {
	(loginModal === false) ? setLoginModal(true) : setLoginModal(false)
  }
  const handleRegisterModal = () => {
	(registerModal === false) ? setRegisterModal(true) : setRegisterModal(false)
  }
  
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
		const apiUrl = process.env.REACT_APP_API_URL
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
		{sessionRunning ? (
			<div>
				Welcome
			</div>
			) : (
			<div className='me-3'>
				<button className='loginButton mt-2 me-2' onClick={handleLoginModal}> Login </button>
				<button className='registerButton' onClick={handleRegisterModal}> Register </button>
				{loginModal && <LoginModal closeModal = {setLoginModal} openRegisterModal = {setRegisterModal} session = {setSessionRunning}/>}
				{registerModal && <RegisterModal closeModal = {setRegisterModal} openLoginModal = {setLoginModal}/>}		
			</div>		
			)
		}
    </header>
  );
};

export default GeoLocationComponent;

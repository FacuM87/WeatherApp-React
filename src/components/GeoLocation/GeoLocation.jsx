import React, { useEffect, useState } from 'react';

const GeoLocationComponent = () => {
  const [location, setLocation] = useState(null);
  
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

console.log(location);


  return (
    <header>
        <div>
        {location ? (
            <p>
            Your current location is: {location.latitude}, {location.longitude}
            </p>
        ) : (
            <p>Getting location...</p>
        )}
        </div>
    </header>
  );
};

export default GeoLocationComponent;

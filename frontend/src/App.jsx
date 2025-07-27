import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useDispatch } from 'react-redux';
import Form from './components/Form/Form';
import GeoLocationComponent from './components/GeoLocation/GeoLocation';
import Footer from './components/Footer/Footer';
import VideoBG from './components/VideoBG/VideoBG';
import config from './config.js';
import { useEffect } from 'react';
import { login } from './redux/userSlice.js';

function App() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const checkAuth = async () => {

            try {
                const response = await fetch(config.api_session_url, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    
                    if (data.status === 'success') {
                        dispatch(login(data.payload));
                    }
                } else if (response.status === 401) {
                    console.log('Please login');
                }
            } catch (error) {
                console.error('Error verifying token:', error)
            }
        };
        
        checkAuth();

    }, [dispatch]);

    return (
        <BrowserRouter>
                <VideoBG/>
                <GeoLocationComponent/>
                <Routes>
                    <Route path="/" element={<Form/>}></Route>
                </Routes>
                <Footer/>
        </BrowserRouter>   
    );
}

export default App;

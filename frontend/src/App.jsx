import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Form from './components/Form/Form';
import GeoLocationComponent from './components/GeoLocation/GeoLocation';
import Footer from './components/Footer/Footer';
import VideoBG from './components/VideoBG/VideoBG';

function App() {
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

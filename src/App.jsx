import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Form from './components/Form/Form';
import GeoLocationComponent from './components/GeoLocation/GeoLocation';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <BrowserRouter>
            <GeoLocationComponent/>
            <Routes>
                <Route path="/" element={<Form/>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>   
    );
}

export default App;

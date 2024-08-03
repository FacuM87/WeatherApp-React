import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Form from './components/Form/Form';
import GeoLocationComponent from './components/GeoLocation/GeoLocation';
import Footer from './components/Footer/Footer';
import VideoBG from './components/VideoBG/VideoBG';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                    <VideoBG/>
                    <GeoLocationComponent/>
                    <Routes>
                        <Route path="/" element={<Form/>}></Route>
                    </Routes>
                    <Footer/>
            </BrowserRouter>   
        </Provider>
    );
}

export default App;

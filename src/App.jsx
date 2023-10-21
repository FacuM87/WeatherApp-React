import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from "react-router-dom"
import Form from './components/Form/Form';

function App() {
    return (
        <BrowserRouter>
            <Form/>
        </BrowserRouter>   
    );
}

export default App;

import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './components/HomePage';
import Output from './components/Output';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/output' element={<Output/>} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;

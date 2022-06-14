import './App.css';
import React from 'react';
// import NumberPresenter from './NumberPresenter';
// import NumberModifier from './NumberModifier';
// import { useCounter } from './CounterProvider';
import { useNavigate, BrowserRouter, Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  // const [value, setValue] = useState(0); //no need 
  // const { value, decrement, increment } = useCounter(); //ez nem a valuet adja vissza listaként két elemmel, hanem a useContext object értékét/valueját adja vissza, amin rajta van a value, decrement és increment



  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>

        {/* <section>
          <h1>Change the value by clicking the buttons</h1>
          <p>{value}</p>
          <button onClick={decrement}>+</button>
          <button onClick={increment}>-</button>

          <NumberPresenter />
          <NumberModifier />
        </section> */}

      </div >
    </BrowserRouter>
  );
}

export default App;

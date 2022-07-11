import './App.css';
import React from 'react';
// import NumberPresenter from './NumberPresenter';
// import NumberModifier from './NumberModifier';
// import { useCounter } from './CounterProvider';
import { Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Callback from './pages/Callback'
import Protected from './components/Protected';
import Register from './pages/Register';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={(
          <Protected key={"1"}>
            <Profile />
          </Protected>
        )} />
        <Route path="/callback/:provider" element={<Callback />} />
        <Route path="/register" element={(
          <Protected key={"2"}>
            <Register />
          </Protected>)} />
      </Routes>
    </div >
  );
}

export default App;

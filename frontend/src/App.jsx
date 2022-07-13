import './App.css';
import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Home from './pages/Home';
import SearchShows from './pages/SearchShows';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Callback from './pages/Callback'
import Protected from './components/Protected';
import Register from './pages/Register';
import CompleteShow from './pages/CompleteShow';
import Watchlist from './pages/Watchlist';
import CompleteShowModify from './pages/CompleteShowModify';
import RequestShow from './pages/RequestShow';
import ManageShows from './pages/ManageShows';
// import Sidebar from './components/Sidebar';

function App() {

  return (
    <div className="App">
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchShows />} />
        <Route path="/show/:id/episodes" element={<CompleteShow />} />
        <Route path="/watchlist/show/:id" element={<CompleteShowModify />} />
        <Route path="/myshows/manage" element={<ManageShows />} />


        <Route path="/request" element={<RequestShow />} />

        <Route path="/profile" element={(
          <Protected key={"1"}>
            <Profile />
          </Protected>
        )} />

        <Route path="/watchlist" element={(
          <Protected key={"1"}>
            <Watchlist />
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

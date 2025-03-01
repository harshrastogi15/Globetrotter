import { useState } from 'react'
import './App.css'
import Game from './page/Game';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvitePage from './components/InvitePage';

function App() {

  return (
    <>
      <h1> Welcome to Globetrotter</h1>
      <Router>
        <Routes>
          <Route path="/invite" element={<InvitePage />} />
          <Route path="/" element={<Game />} />
        </Routes>
      </Router>
      <p> Designed by Harsh Rastogi</p>
    </>
  )
}

export default App

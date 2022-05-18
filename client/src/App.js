import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Leaderboard from './components/Leaderboard'
import Singleplayer from './components/Singleplayer'
import Multiplayer from './components/Multiplayer'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/leaderboard" element={<Leaderboard/>}/>
          <Route path="/singleplayer" element={<Singleplayer/>}/>
          <Route path="/multiplayer" element={<Multiplayer/>}/>
       </Routes>
      </Router>
    </>
  )
}

export default App;

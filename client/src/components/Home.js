import React from 'react'
import { Link } from 'react-router-dom';
import "../stylesheets/styles.css"

const Home = () => {
  return(
    <div className='d-flex align-items-center flex-column center'>
      <div className='mt-5 mx-auto'>
        <h1 className='creepy-text'>HANGMAN</h1>
        <h1 className='creepy-text'>HANGMAN</h1>
        <h1 className='creepy-text'>HANGMAN</h1>
      </div>
      <div className="d-flex flex-column mt-4 align-content-center hstack">
        <div className='flex-row align-content-center'>
          <Link to="/singleplayer">
            <button className="btn-home">Singleplayer</button>
          </Link>
        </div>
        <div className='row'>
          <Link to="/multiplayer">
            <button className="btn-home">Multiplayer</button>
          </Link>
        </div>
        <div className='row'>
          <Link to="/leaderboard">
            <button className="btn-home">Leaderboard</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;
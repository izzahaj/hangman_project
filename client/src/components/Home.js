import React from 'react'
import { Link } from 'react-router-dom';
import "../stylesheets/styles.css"

const Home = () => {

  // set username when singleplayer option is selected
  // alternatively: only submit username & score upon completion of game
  // -> saves database space
  // work on logic and correctness of code before dealing with css
  // style reference tag as a button for the link using css
  /* handle http GET request here */

  return(
    <div className='container-2 center'>
      <div className='row creepy-text-container'>
        <h1 className='creepy-text'>HANGMAN</h1>
        <h1 className='creepy-text'>HANGMAN</h1>
        <h1 className='creepy-text'>HANGMAN</h1>
      </div>
      <div className='row'>
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
  )
}

export default Home;
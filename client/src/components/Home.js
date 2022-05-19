import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  // const [username, setUsername] = useState("")
  // const [score, setScore] = useState(0)
 
  // set username when singleplayer option is selected
  // alternatively: only submit username & score upon completion of game
  // -> saves database space
  // work on logic and correctness of code before dealing with css
  // style reference tag as a button for the link using css
  /* handle http GET request here */

  return(
    <div className='container-2'>
      <h1 className='row'>Hangman</h1>
      <div>
        
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
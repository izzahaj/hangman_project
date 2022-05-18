import React, { useState } from 'react'

const Home = () => {
  // const [username, setUsername] = useState("")
  // const [score, setScore] = useState(0)
 
  // set username when singleplayer option is selected
  // alternatively: only submit username & score upon completion of game
  // -> saves database space
  // work on logic and correctness of code before dealing with css
  /* handle http GET request here */

  return(
    <div>
      <h1>Hangman</h1>
      <button href={'/singleplayer'}>Singleplayer</button>
      <button href={'/multiplayer'}>Multiplayer</button>
      <button href={'/leaderboard'}>Leaderboard</button>
    </div>
  )
}

export default Home;
import React, { useState, useEffect } from "react";

const Singleplayer = () => {  
  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
        "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [word, setWord] = useState("")
  const [correct, setCorrect] = useState([])
  const [guessed, setGuessed] = useState([])
  const [lives, setLives] = useState(6) // 6 lives
  const [message, setMessage] = useState(lives + "lives left")
  const [points, setPoints] = useState(0)
  const [status, setStatus] = useState("Ongoing")
  const hiddenWord = word.toUpperCase().split("").map(letter => correct.includes(letter) ? letter : "_").join(" ")
  let guesses = guessed.join(" ")
  const MAX_SCORE = 2400
  
  const checkWin = () => {
    if (!hiddenWord.includes("_") && lives > 0) {
      setMessage("You win!")
      setStatus("W")
      countPoints()
    } else if (hiddenWord.includes("_") && lives <= 0) {
      setMessage("You Lose!")
      setStatus("L")
      countPoints()
    } else {
      setMessage(lives + " lives left")
      setStatus("Ongoing")
    }
    return message
  }
  
  const countPoints = () => {
    if (status === "W" && lives > 0) {
      setPoints((lives / 6) * MAX_SCORE)
    }
  }

  const endGame = () => {
    if (status === "W") {
      alert("You win") // replace with modal and submit score to database
    } else if (status === "L") {
      alert("You lose") // replace with modal and submit score to database
    }
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getWord = () => {
    fetch(`https://www.wordgamedb.com/api/v1/words/?numLetters=${randomIntFromInterval(3, 7)}`)
      .then(res => res.json())
      .then(data => {
        setWord(data[Math.floor(Math.random() * data.length)].word.toUpperCase())
      })
  }

  useEffect(() => {
    getWord()
  }, [])

  useEffect(() => {
    checkWin()
  })
  
  return(
    <div>
      <h1>Singleplayer</h1>
      <h2>{hiddenWord}</h2>
      {alphabets.map((a, i) => <button key={i} onClick={() => {
        if (word.includes(a) && !guesses.includes(a)) {
          setCorrect([...correct, a])
          setGuessed([...guessed, a])
          checkWin()
        } else if (!guesses.includes(a)) {
          setLives(lives - 1)
          setGuessed([...guessed, a])
          checkWin()
        }
      }}>{a}</button>)}
      <h2>{guesses}</h2>
      <h2>{message}</h2>
      <h2>{status !== "Ongoing" ? points : null}</h2>
    </div>
  )
}

export default Singleplayer

// General game logic to implement
// 6 lives --> player gets more points if they with fewer incorrect guesses/more lives left
// run a stopwatch --> the faster the time taken to win, the more points they get
// max score from lives alone = 2400
// add bonus points based on time taken
// if take more than 1 min, no bonus points
// time-based bonus points --> figure out the math for this
// display no. of lives left
// display letters used
// only allow letters as guesses
// update gallows & lives every time an incorrect guess is made
// ensure user cannot continue playing when lives === 0 or if user wins
// submit username & score to database upon completion of game
// reveal word at end of game regardless of outcome
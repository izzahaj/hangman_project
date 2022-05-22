import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Stopwatch from "./Stopwatch";
import hangman1 from "./images/hangman1.jpg";
import hangman2 from "./images/hangman2.jpg";
import hangman3 from "./images/hangman3.jpg";
import hangman4 from "./images/hangman4.jpg";
import hangman5 from "./images/hangman5.jpg";
import hangman6 from "./images/hangman6.jpg";
import hangman7 from "./images/hangman7.jpg";

const Singleplayer = () => {
  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [start, setStart] = useState(false)
  const [time, setTime] = useState(0)
  const [word, setWord] = useState("")
  const [correct, setCorrect] = useState([])
  const [guessed, setGuessed] = useState([])
  const [lives, setLives] = useState(6) // 6 lives
  const [status, setStatus] = useState("Ongoing")
  const hiddenWord = word.toUpperCase().split("").map(letter => correct.includes(letter) ? letter : "_").join(" ")
  let guesses = guessed.join(" ")
  const MAX_SCORE = 24000
  const MAX_BONUS = 60000
  const bonus = (time > 60000 || status === "L") ? 0 : MAX_BONUS - time
  const endMessage = status === "W" ? "You won!" : "You lost!"
  
  const imagesHangman = [hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7];

  const showModal = () => {
    setIsOpenModal(true)
  }

  const hideModal = () => {
    setIsOpenModal(false)
  }

  const checkWin = () => {
    if (!hiddenWord.includes("_") && lives > 0) {
      setStatus("W")
      endGame()
    } else if (hiddenWord.includes("_") && lives === 0) {
      setStatus("L")
      endGame()
    }
  }

  const countPoints = () => {
    if (status === "W" && lives > 0) {
      return (lives / 6) * MAX_SCORE + bonus
    } else {
      return 0
    }
  }

  const endGame = () => {
    setStart(false)
    showModal()
  }

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const getWord = () => {
    fetch(`https://www.wordgamedb.com/api/v1/words/?numLetters=${randomIntFromInterval(3, 7)}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not fetch word data.")
        }
        return res.json()
      })
      .then(data => {
        setWord(data[Math.floor(Math.random() * data.length)].word.toUpperCase())
      })
      .then(() => console.log("Ok"))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getWord()
  }, [])

  useEffect(() => {
    if ((lives >= 0 && lives < 6) && status === "Ongoing") {
      checkWin()
    }
  })

  return (
    <>
      <div className="container-1 center">
        <h1>Singleplayer</h1>
        <Stopwatch start={start} time={time} setTime={setTime}/>
        <img src = {imagesHangman[6-lives]} width="325" height="280" alt="hangman"/>
        <h2 className="hidden-word">{hiddenWord}</h2>
        <div className="flex-container">
          {alphabets.map((a, i) => <button className="letter-btn" key={i} disabled={guessed.includes(a)} onClick={() => {
            if (!start) {
              setStart(true)
            }
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
        </div>
        <h3>Letters used:</h3>
        <h3>{guesses}</h3>
        <h3>Lives left: {lives < 0 ? 0 : lives}</h3>
      </div>
      <div className="container-1">
        <Modal show={isOpenModal} onClose={hideModal} title={endMessage} score={countPoints()}>
          <p>Bonus points: {bonus}</p>
          <p>Total Score: {countPoints()}</p>
          <p>The word is: {word}</p>
        </Modal>
      </div>
    </>
  )
}

export default Singleplayer

// General game logic to implement
// 6 lives --> player gets more points if they with fewer incorrect guesses/more lives left
// run a stopwatch --> the faster the time taken to win, the more points they get
// max score from lives alone = 24000
// add bonus points based on time taken --> max bonus points = 60000
// if take more than 1 min, no bonus points
// time-based bonus points --> decrease by 1 for every millisecond taken to complete game
// display no. of lives left
// display letters used
// only allow letters as guesses
// update gallows & lives every time an incorrect guess is made
// ensure user cannot continue playing when lives === 0 or if user wins
// submit username & score to database upon completion of game
// reveal word at end of game regardless of outcome

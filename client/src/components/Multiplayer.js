import React, { useState, useEffect } from "react";
import SetWordModal from "./SetWordModal";
import Stopwatch from "./Stopwatch";
import Modal from "./modal/Modal";
import ModalHeader from "./modal/ModalHeader";
import ModalTitle from "./modal/ModalTitle";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import { Link } from "react-router-dom";
import hangman1 from "./images/hangman1.jpg";
import hangman2 from "./images/hangman2.jpg";
import hangman3 from "./images/hangman3.jpg";
import hangman4 from "./images/hangman4.jpg";
import hangman5 from "./images/hangman5.jpg";
import hangman6 from "./images/hangman6.jpg";
import hangman7 from "./images/hangman7.jpg";

const Multiplayer = () => {
  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];

  const [word, setWord] = useState("")
  const [wordModal, setWordModal] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [start, setStart] = useState(false)
  const [time, setTime] = useState(0)
  const [correct, setCorrect] = useState([])
  const [guessed, setGuessed] = useState([])
  const [lives, setLives] = useState(6) // 6 lives
  const [status, setStatus] = useState("")
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

  useEffect(() => {
    if ((lives >= 0) && status === "Ongoing") {
      checkWin()
    }
  })

  return (
    <>
      <div className="container-1 center">
        <h1>Multiplayer</h1>
        <Stopwatch start={start} time={time} setTime={setTime}/>
        <img src = {imagesHangman[6-lives]} width="325" height="280" alt="hangman"/>
        <h2 className="hidden-word">{hiddenWord}</h2>
        <div className="flex-container">
          {alphabets.map((a, i) => <button className="letter-btn" key={i} disabled={guessed.includes(a)} onClick={() => {
            if (!start) {
              setStart(true)
              setStatus("Ongoing")
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
        <Modal show={isOpenModal} onClose={hideModal}>
          <ModalHeader>
            <ModalTitle>{endMessage}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Bonus points: {bonus}</p>
            <p>Total Score: {countPoints()}</p>
            <p>The word is: {word}</p>
          </ModalBody>
          <ModalFooter>
            <Link to="/"><button className="button">Play Again</button></Link>
          </ModalFooter>
        </Modal>
        <SetWordModal
          show={wordModal}
          onClose={() => setWordModal(false)}
          word={word}
          setWord={setWord}
        />
      </div>
    </>
  )
}

export default Multiplayer

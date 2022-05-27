import React, { useState, useEffect } from "react";
import SubmitScore from "./SubmitScore";
import Modal from "./modal/Modal";
import ModalHeader from "./modal/ModalHeader";
import ModalTitle from "./modal/ModalTitle";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import GameLayout from "./GameLayout";
import { Link } from "react-router-dom";

const Singleplayer = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [showSubmit, setShowSubmit] = useState(false)
  const [start, setStart] = useState(false)
  const [time, setTime] = useState(0)
  const [word, setWord] = useState("")
  const [correct, setCorrect] = useState([])
  const [lives, setLives] = useState(6) // 6 lives
  const [status, setStatus] = useState("")
  const hiddenWord = word.toUpperCase().split("").map(letter => correct.includes(letter) ? letter : "_").join(" ")
  const MAX_SCORE = 24000
  const MAX_BONUS = 60000
  const bonus = (time > 60000 || status === "L") ? 0 : MAX_BONUS - time
  const endMessage = status === "W" ? "You won!" : "You lost!"
  
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
    if ((lives >= 0) && status === "Ongoing") {
      checkWin()
    }
  })

  return (
    <>
      <GameLayout
        word={word}
        hiddenWord={hiddenWord}
        start={start}
        setStart={setStart}
        time={time}
        setTime={setTime}
        lives={lives}
        setLives={setLives}
        setStatus={setStatus}
        checkWin={checkWin}
        correct={correct}
        setCorrect={setCorrect}
        mode={"Singleplayer"}
      />
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
            <button className="button" onClick={() => setShowSubmit(true)}>Submit Score</button>
            <Link to="/"><button className="button">Play Again</button></Link>
              <SubmitScore
                show={showSubmit}
                onClose={() => setShowSubmit(false)}
                score={countPoints()}
              />
          </ModalFooter>
        </Modal>
      </div>
    </>
  )
}

export default Singleplayer
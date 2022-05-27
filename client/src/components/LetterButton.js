import React from "react";

const LetterButton = (props) => {
  const {
    letter, start, setStart, setStatus, word,
    guesses, setCorrect, correct, setGuessed,
    guessed, checkWin, lives, setLives
  } = props

  return (
    <button className="letter-btn" disabled={guessed.includes(letter)} onClick={() => {
      if (!start) {
        setStart(true)
        setStatus("Ongoing")
      }
      if (word.includes(letter) && !guesses.includes(letter)) {
        setCorrect([...correct, letter])
        setGuessed([...guessed, letter])
        checkWin()
      } else if (!guesses.includes(letter)) {
        setLives(lives - 1)
        setGuessed([...guessed, letter])
        checkWin()
      }
    }}>
      {letter}
    </button>
  )
}

export default LetterButton
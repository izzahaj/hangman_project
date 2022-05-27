import React, { useState } from "react";
import Stopwatch from "./Stopwatch";
import LetterButton from "./LetterButton";
import hangman1 from "./images/hangman1.jpg";
import hangman2 from "./images/hangman2.jpg";
import hangman3 from "./images/hangman3.jpg";
import hangman4 from "./images/hangman4.jpg";
import hangman5 from "./images/hangman5.jpg";
import hangman6 from "./images/hangman6.jpg";
import hangman7 from "./images/hangman7.jpg";

const GameLayout = (props) => {
  const { word, hiddenWord, start, setStart, time, setTime, lives, setLives, setStatus, checkWin, correct, setCorrect, mode } = props
  const alphabets = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
  
  const [guessed, setGuessed] = useState([])
  let guesses = guessed.join(" ")
  const imagesHangman = [hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7];

  return (
    <div className="container-1 center">
      <div>
        { hiddenWord === "" ? <h1>Loading...</h1>
          : 
          <>
            <h1>{mode}</h1>
            <Stopwatch start={start} time={time} setTime={setTime}/>
            <img src={imagesHangman[6 - lives]} width="325" height="280" alt="hangman"/>
            <h2 className="hidden-word">{hiddenWord}</h2>
            <div className="flex-container">
              {alphabets.map((a, i) =>
                <LetterButton
                  key={i}
                  letter={a}
                  start={start}
                  setStart={setStart}
                  setStatus={setStatus}
                  word={word}
                  guesses={guesses}
                  setCorrect={setCorrect}
                  correct={correct}
                  setGuessed={setGuessed}
                  guessed={guessed}
                  checkWin={checkWin}
                  lives={lives}
                  setLives={setLives}
                />)}
            </div>
            <h3>Letters used:</h3>
            <h3>{guesses}</h3>
            <h3>Lives left: {lives < 0 ? 0 : lives}</h3>
          </>
        }
      </div>
    </div>
  )
}

export default GameLayout
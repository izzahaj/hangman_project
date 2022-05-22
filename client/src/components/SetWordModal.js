import React from "react";
import { Link } from "react-router-dom";
import Modal from "./modal/Modal";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";
import ModalHeader from "./modal/ModalHeader";
import ModalTitle from "./modal/ModalTitle";

const SetWordModal = (props) => {  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.setWord(props.word.toUpperCase())
    props.onClose()
  }

  return (
    <Modal show={props.show} onClose={props.onClose}>
      <ModalHeader>
        <ModalTitle>Multiplayer</ModalTitle>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <label htmlFor="word">Please enter a word:</label>
          <br/>
          <input className="form-control" type="text" name="word" onChange={e => props.setWord(e.target.value)} required/>       
        </ModalBody>
        <ModalFooter>
          <button className="btn" type="submit">Play</button>
          <Link to="/"><button className="btn-close">Back to Home</button></Link>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default SetWordModal
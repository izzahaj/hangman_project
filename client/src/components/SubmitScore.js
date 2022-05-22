import React, { useState } from "react";
import Modal from "./modal/Modal";
import ModalHeader from "./modal/ModalHeader";
import ModalTitle from "./modal/ModalTitle";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";

const SubmitScore = (props) => {
  const [username, setUsername] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // http POST request here
  }

  return (
    <Modal show={props.show} onClose={props.onClose}>
      <ModalHeader>
        <ModalTitle>Submit Score</ModalTitle>
      </ModalHeader>
      <form onSubmit={handleSubmit}>
        <ModalBody>
          <label htmlFor="username">Please enter a username:</label>
          <br/>
          <input className="form-control" type="text" name="username" onChange={e => setUsername(e.target.value)} required/>
        </ModalBody>
        <ModalFooter>
          <button className="btn" type="submit">Submit Score</button>
          <button className="btn-close" onClick={props.onClose}>Close</button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default SubmitScore
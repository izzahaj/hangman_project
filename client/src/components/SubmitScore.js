import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import Modal from "./modal/Modal";
import ModalHeader from "./modal/ModalHeader";
import ModalTitle from "./modal/ModalTitle";
import ModalBody from "./modal/ModalBody";
import ModalFooter from "./modal/ModalFooter";

const SubmitScore = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const score = props.score

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = document.querySelector('meta[name="csrf-token"]')
    const url = "http://localhost:5000/api/add-user"

    fetch(url, {
      method: 'POST',
      headers: {
        "X-CSRF-Token": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, score })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Could not create user.")
      }
      return res.json()
    })
    .then(() => console.log("Ok"))
    .catch(err => console.log(err))
    navigate("/")
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
          <input className="form-control form-control-sm" type="text" name="username" onChange={e => setUsername(e.target.value)} required/>
        </ModalBody>
        <ModalFooter>
          <button className="button" type="submit">Submit Score</button>
          <button className="button-2" onClick={props.onClose}>Close</button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default SubmitScore
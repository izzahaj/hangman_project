import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group"

const SubmitScore = (props) => {
  const nodeRef = useRef(null)
  const [username, setUsername] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // http POST request here
  }

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div ref={nodeRef} className={`modal ${props.show ? 'show' : ''}`}>
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{props.title}</h4>
              </div>
              <div className="modal-body">
                <label htmlFor="username">Please enter a username:</label>
                <br/>
                <input className="form-control" type="text" name="username" onChange={e => setUsername(e.target.value)} required/>
              </div>
              <div className="modal-footer">
                <button className="btn" type="submit">Submit Score</button>
                <button className="btn-close" onClick={props.onClose}>Close</button>
              </div>
            </div>
          </form>
        </div>
      </CSSTransition>
    </>
  )
}

export default SubmitScore
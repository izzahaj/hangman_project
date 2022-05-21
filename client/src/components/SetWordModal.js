import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

const SetWordModal = (props) => {
  const nodeRef = useRef(null)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.setWord(props.word.toUpperCase())
    props.onClose()
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
                <label htmlFor="word">Please enter a word:</label>
                <br/>
                <input className="form-control" type="text" name="word" onChange={e => props.setWord(e.target.value)} required/>
              </div>
              <div className="modal-footer">
                <button className="btn" type="submit">Play</button>
                <Link to="/"><button className="btn-close">Back to Home</button></Link>
              </div>
            </div>
          </form>
        </div>
      </CSSTransition>
    </>
  )
}

export default SetWordModal
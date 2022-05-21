import React, { useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import { Link }  from "react-router-dom"
import SubmitScore from "./SubmitScore"
import "../stylesheets/styles.css"

const Modal = (props) => {
  const nodeRef = useRef(null)
  const [showSubmit, setShowSubmit] = useState(false)

  return(
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
      >
        <div ref={nodeRef} className={`modal ${props.show ? 'show' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{props.title}</h4>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer">
              <button className="btn" onClick={() => setShowSubmit(true)}>Submit Score</button>
              <Link to="/"><button className="btn">Play Again</button></Link>
              <SubmitScore
                show={showSubmit}
                onClose={() => setShowSubmit(false)}
                title="Submit Score"
                score={props.score}
              />
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
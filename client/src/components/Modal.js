import React, { useEffect } from "react";
import { CSSTransition } from "react-transition-group"
import { Link}  from "react-router-dom"
import styles from "../stylesheets/styles.css"

const Modal = (props) => {
  const nodeRef = React.useRef(null)
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose()
    }
  }

  const cleanup = () => {
    document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return cleanup()
  }, [])

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
              <Link to="/"><button className="btn">Play Again</button></Link>
              <button className="btn" onClick={props.onClose}>Submit Score</button>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  )
}

export default Modal
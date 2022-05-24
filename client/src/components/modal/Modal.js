import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  const nodeRef = useRef(null)

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div ref={nodeRef} className={`modal-2 ${props.show ? 'show' : ''}`}>
        <div className="modal-content-2">{props.children}</div>
      </div>
    </CSSTransition>
  )
}

export default Modal
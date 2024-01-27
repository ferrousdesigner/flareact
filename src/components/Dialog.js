import React, { useEffect } from "react"
import Portal from "./Portal"
import ReactDOM from "react-dom"
import "../styles/dialog.css"

export const DialogHeader = ({ children }) => {
  return <div className='dialog-header'>{children}</div>
}
const Dialog = props => {
  const { open, onClose, big, right, closeOnOverlay } = props
  const getClass = open => {
    let classNames = "dialog zoom-in"
    if (open) classNames += " open"
    if (right) classNames += " right"
    if (big) classNames += " big"
    return classNames
  }
  useEffect(() => {
    if (open) document.body.style.overflowY = "hidden"
    else document.body.style.overflowY = "auto"
    return () => {
      document.body.style.overflowY = "auto"
    }
  }, [open])
  return (
    <Portal simple open={open}>
      <div className={getClass(open)}>
        <div
          className='dialog-underlay'
          onClick={closeOnOverlay ? onClose : null}
        />
        {open && (
          <div className='dialog-content appear' id={props.id}>
            <div>{props.children}</div>
            {onClose &&
              window.innerWidth < 700 &&
              ReactDOM.createPortal(
                <button
                  type='button'
                  onClick={onClose}
                  className='dialog-close'
                >
                  <i className='fas fa-times' />
                </button>,
                document.body,
              )}
            {onClose && window.innerWidth >= 700 && (
              <button type='button' className='dialog-close' onClick={onClose}>
                <i className='fas fa-times' />
              </button>
            )}
          </div>
        )}
      </div>
    </Portal>
  )
}

export default Dialog

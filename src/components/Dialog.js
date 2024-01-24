import React, { useEffect } from 'react'
import Portal from './Portal'
import ReactDOM from 'react-dom'
import '../styles/dialog.css'

const Dialog = props => {
  const { open, onClose, big, right } = props
  const getClass = open => {
    let classNames = 'dialog zoom-in'
    if (open) classNames += ' open'
    if (right) classNames += ' right'
    if (big) classNames += ' big'
    return classNames
  }
  useEffect(() => {
    if (open) document.body.style.overflowY = 'hidden'
    else document.body.style.overflowY = 'auto'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [open])
  return (
    <Portal simple open={open}>
      <div className={getClass(open)}>
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
              <button type='button dialog-close' onClick={onClose}>
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

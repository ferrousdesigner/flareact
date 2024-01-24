import React, { Fragment, useState } from "react"
import { isMobile } from "../../../GeneralFunctions"
import "./Expander.css"
import Button from "../../Button"

export default function Expander({
  children,
  initiallyOpen,
  showOnMobile,
  title,
  subTitle,
  onClearShow,
  onClearClick,
  deleteAction,
  padded,
  expanded, // New prop for controlling expanded state
  onToggle, // New callback for handling expansion toggling
}) {
  const [open, setOpen] = useState(initiallyOpen)

  // Update local state when the 'expanded' prop changes
  React.useEffect(() => {
    setOpen(expanded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])
  React.useEffect(() => {
    setOpen(initiallyOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const expanderContent = () => {
    return (
      <div
        className='expander'
        style={{ marginBottom: isMobile && open ? "3rem" : "" }}
      >
        <div className='expander-header'>
          <div>
            <h1>{title}</h1>
            <h4>{subTitle}</h4>
          </div>
          <div>
            {deleteAction ? (
              <Button
                disabled={deleteAction?.disabled}
                onClick={() => deleteAction?.onClick()}
                small
                danger
              >
                {deleteAction?.label}
              </Button>
            ) : (
              ""
            )}
            {onClearShow && (
              <Button circle small accent onClick={onClearClick}>
                <span className='fa fa-times'></span>
              </Button>
            )}
            {showOnMobile && isMobile && (
              <button
                className='exp-btn'
                onClick={() => {
                  setOpen(!open)
                  onToggle(!open)
                }}
              >
                <span
                  className={open ? "fas fa-chevron-up" : "fas fa-chevron-down"}
                />
              </button>
            )}
            {!showOnMobile && (
              <button
                type='button'
                className='exp-btn'
                onClick={() => {
                  setOpen(!open)
                  onToggle && onToggle(!open)
                }}
              >
                <span
                  className={open ? "fas fa-chevron-up" : "fas fa-chevron-down"}
                />
              </button>
            )}
          </div>
        </div>
        <div
          style={{
            padding: padded && open ? (isMobile ? "0 1rem" : "0 2rem") : "",
          }}
        >
          {showOnMobile && open ? children : <Fragment />}
          {showOnMobile && !isMobile ? children : ""}
          {!showOnMobile && open ? children : ""}
        </div>
      </div>
    )
  }

  return expanderContent()
}

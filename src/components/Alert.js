import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import "../styles/alert.css"
import { useStateValue } from "../StateProvider"
import { isMobile } from "../GeneralFunctions"

const getClassByType = type => {
  switch (type) {
    case "success":
      return "success-alert"
    case "error":
      return "error-alert"
    default:
      return "info-alert"
  }
}

const figureOutType = message => {
  if (!message) return
  let words = ["apology", "sorry", "not responding", "wrong", "try again"]
  let successWords = [
    "success",
    "succesfully",
    "congrats",
    "great",
    "completed",
    "Good work",
    "activated",
  ]
  let hasError = false
  let hasSuccess = false
  words.forEach(err => {
    if (message.includes(err) && !hasError) {
      hasError = true
    }
  })
  successWords.forEach(err => {
    if (message.includes(err) && !hasSuccess) {
      hasSuccess = true
    }
  })
  return hasError ? "error" : hasSuccess ? "success" : "info"
}

export default function Alert() {
  const [{ alert, alertTop }, dispatch] = useStateValue()
  let { message, alertType, persist, open } = alert || {}

  useEffect(() => {
    if (alert?.message != null) {
      setTimeout(() => {
        dispatch({
          type: "HIDE_ALERT",
        })
      }, 5000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert])

  const hideAlert = () => {
    dispatch({
      type: "HIDE_ALERT",
    })
  }
  return (
    <div>
      {ReactDOM.createPortal(
        <div
          className={open ? "alert-container open" : "alert-container"}
          style={{ top: isMobile ? "0" : alertTop }}
        >
          <div className={getClassByType(alertType || figureOutType(message))}>
            <div>
              <span
                className={
                  alertType === "success"
                    ? "fas fa-check-circle"
                    : alertType === "error"
                    ? "fas fa-times-circle"
                    : "fa fa-info-circle"
                }
              />
              {message}
            </div>
            {!persist && (
              <button className='alert-close' onClick={() => hideAlert()}>
                <span className='fas fa-times' />
              </button>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  )
}

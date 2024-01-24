import React from "react"
import "./Highlight.css"

const getIconFromType = type => {
  let def = "fas fa-info-circle"
  if (type === "danger") {
    def = "fas fa-times-circle"
  } else if (type === "warn") {
    def = "fas fa-exclamation-triangle"
  } else if (type === "success") {
    def = "fas fa-check-circle"
  }

  return <span className={`highlight-icon ${def}`} />
}
const getClassByType = type => {
  let def = "default"
  return type ? type : def
}
const Highlight = ({ type, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className={`highlight highlight-${getClassByType(type)}`}
    >
      <span>{getIconFromType(type)}</span>
      <span>{children}</span>
    </div>
  )
}

export default Highlight

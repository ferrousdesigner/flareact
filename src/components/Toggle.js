import React from "react"
import "../styles/toggle.css"
import { flexRowCenterBetween } from "../styles/CommonStyles"
import Button from "./Button"

const Toggle = ({
  active,
  onClick,
  activeLabel,
  label,
  disabled,
  horizontal,
  textAlign,
  activeIcon,
  icon,
  asButton,
}) => {
  return asButton ? (
    <Button onClick={() => (disabled ? {} : onClick(!active))}>
      {" "}
      <button
        style={{
          marginBottom: 0,
          width: "8rem",
          height: "3rem",
          marginRight: "1rem",
        }}
        type='button'
        className={active ? "toggle active" : "toggle"}
      >
        <div></div>
      </button>{" "}
      {active ? activeIcon : icon}{" "}
      <span style={{ paddingLeft: "0.5rem" }}>
        {active ? activeLabel : label}
      </span>
    </Button>
  ) : (
    <div style={horizontal ? { ...flexRowCenterBetween } : {}}>
      <button
        style={{ marginBottom: 0, width: "8rem", height: "3rem" }}
        onClick={() => (disabled ? {} : onClick(!active))}
        className={active ? "toggle active" : "toggle"}
      >
        <div></div>
      </button>
      <div
        style={{
          paddingTop: !horizontal ? "1rem" : "",
          width: horizontal ? "auto" : "100%",
          fontSize: "2rem",
          textAlign: textAlign || "center",
          color: "var(--theme-color)",
          paddingLeft: horizontal ? "1rem" : "",
          paddingRight: horizontal ? "1rem" : "",
        }}
      >
        {active ? activeIcon : icon} {active ? activeLabel : label}
      </div>
    </div>
  )
}

export default Toggle

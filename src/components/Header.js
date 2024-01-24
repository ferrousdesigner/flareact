import React from "react"
import "../styles/header.css"

const Header = props => {
  const getClass = ({
    bold,
    xxxl,
    xxl,
    xl,
    lg,
    md,
    sm,
    xs,
    xxs,
    upper,
    inline,
    accent,
    danger,
    uppercase,
    flexStart,
    gold,
    lightGold,
    silver,
    alt,
    altTwo,
    altThree,
  }) => {
    let classNames = "header"
    if (bold) classNames += " bold"
    if (xxl) classNames += " xxl-size"
    if (xxxl) classNames += " xxxl-size"
    if (xl) classNames += " xl-size"
    if (lg) classNames += " lg-size"
    if (md) classNames += " md-size"
    if (sm) classNames += " sm-size"
    if (xs) classNames += " xs-size"
    if (xxs) classNames += " xxs-size"
    if (upper) classNames += " upper"
    if (inline) classNames += " inline"
    if (accent) classNames += " accent"
    if (danger) classNames += " danger"
    if (uppercase) classNames += " uppercase"
    if (flexStart) classNames += " flex-start"
    if (gold) classNames += " gold"
    if (lightGold) classNames += " light-gold"
    if (silver) classNames += " silver"
    if (alt) classNames += " alt"
    if (altTwo) classNames += " altTwo"
    if (altThree) classNames += " altThree"

    return classNames
  }
  return (
    <h1
      className={getClass(props) + " " + (props.className || "")}
      style={{
        textAlign: props.center ? "center" : props.right ? "right" : "left",
        ...props.style,
        color: props.color,
        marginBottom: props.noMar ? 0 : "",
      }}
      data-tip={props.tip}
    >
      {props.children}{" "}
      {props.busy && (
        <span
          style={{ color: "var(--main-font-color)" }}
          className='fas fa-circle-notch fa-spin'
        />
      )}
      {props.checked && !props.busy && <span className='fas fa-check-circle' />}
      {props.crossed && !props.busy && <span className='fas fa-times-circle' />}
    </h1>
  )
}

export default Header

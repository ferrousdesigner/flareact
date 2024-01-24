import React, { Fragment } from "react"
import { Link } from "react-router-dom"

const NavItem = ({
  label,
  to,
  tag,
  onClick,
  disabled,
  icon,
  iconClass,
  activeOn,
  hidden,
  highlighted,
}) => {
  return hidden ? (
    <Fragment />
  ) : (
    <Link
      key={label}
      className={
        (activeOn ? "nav-item nav-item-active" : "nav-item") +
        (highlighted ? ` highlighted` : "")
      }
      to={to || "#"}
      onClick={!disabled && onClick}
    >
      {activeOn && <span className='nav-item-dot' />}
      {icon}

      {!icon && iconClass && (
        <span className={"nav-item-icon " + iconClass}>
          {tag ? <div className='nav-item-tag'>{tag}</div> : ""}
        </span>
      )}
      {label && <div className={"nav-item-label"}>{label}</div>}
    </Link>
  )
}
export default NavItem

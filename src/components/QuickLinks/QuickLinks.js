import React from "react"
import { Link } from "react-router-dom"
import "./QuickLinks.css"

const QuickLinkWrapper = ({ children }) => {
  return <div className='quick-link-wrapper'>{children}</div>
}
const QuickLink = ({ link }) => {
  return (
    <Link className='quick-link' to={link?.to || "#"} onClick={link?.onClick}>
      <span className={`quick-link-icon ` + link?.iconClass} />
      <span className={`quick-link-label`}>{link?.label}</span>
    </Link>
  )
}
export default function QuickLinks({ links }) {
  return (
    <QuickLinkWrapper>
      {links?.map(link => (
        <QuickLink link={link} key={link?.label} />
      ))}
    </QuickLinkWrapper>
  )
}

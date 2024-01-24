import React from "react"
import "./NoRecord.css"
import { Col, Row } from "../../Grid"
import getSVG from "../../../images/svgs/svg"
const NoRecord = ({ children, type, iconClass, svg }) => {
  if (type === "card") {
    return (
      <div className='no-record no-record-card'>
        <div className='no-record-icon'>
          {svg ? (
            <span className='icon-svg'>{svg}</span>
          ) : (
            <span className={"icon " + iconClass}></span>
          )}
        </div>
        <div className='no-record-card-msg'>{children}</div>
      </div>
    )
  } else if (type === "text") {
    return <div className='no-record'>{children}</div>
  } else if (type === "general") {
    return (
      <div className='no-record no-record-general-container'>
        <div className='no-record-general'>
          <Row middle='sm' start='xs'>
            <Col xs={3} md={2}>
              {getSVG(svg, { width: "90%", marginLeft: "5%" }, null, true)}
            </Col>
            <Col xs={9} md={8}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    )
  } else {
    return <div className='no-record'>{children}</div>
  }
}
export default NoRecord

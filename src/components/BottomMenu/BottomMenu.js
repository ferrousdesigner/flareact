import React, { Component } from "react"
import { Col, Row } from "./../Grid"
import { connect } from "react-redux"
import { CustomLink as Link } from "./../CustomLink"
import "./BottomMenu.css"

class BottomMenu extends Component {
  render() {
    const { actions } = this.props
    let hideOnPaths = ["/", "/sign_up"]
    const hide = hideOnPaths.includes(window.location.pathname)
    return (
      <div className={hide ? "bottom-menu bottom-menu-hide" : "bottom-menu"}>
        <Row center='xs'>
          <Col xs={11} sm={8} md={6} lg={5} className='anchord'>
            {actions &&
              actions.map(({ to, onClick, icon }, k) => {
                return (
                  <Link to={to} onClick={onClick}>
                    <span className={icon} />
                  </Link>
                )
              })}
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => state,
  d => ({}),
)(BottomMenu)

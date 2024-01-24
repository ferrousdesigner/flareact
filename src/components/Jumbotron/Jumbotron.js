import React, { Component } from "react"
import { Grid } from "./../Grid"
import "./Jumbotron.css"
import { Row } from "./../Grid"
import { Col } from "./../Grid"
import getSVG from "../../images/svgs/svg"
import { isMobile } from "../../GeneralFunctions"

export default class Jumbotron extends Component {
  render() {
    const { title, desc, children, icon, svg } = this.props
    return (
      <Grid>
        <Row center='xs' style={{ textAlign: "left" }}>
          <Col xs={12} sm={12}>
            <div className='jumbotron'>
              <h2 className='title'>{title}</h2>
              <p className='desc'>{desc}</p>
              {children}
              {!svg && icon && <span className={"jumbotron__icon " + icon} />}
              {isMobile && svg && (
                <span className={"jumbotron__svg "}>
                  {getSVG(svg, null, null, true)}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

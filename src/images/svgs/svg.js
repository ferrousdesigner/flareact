import React from "react"
import { Col, Row } from "./../../components/Grid"

const getSVG = (type, style, onLoad, alone) => {
  let img = require(`/${type}.svg`)
  if (img.default) {
    let IMG = () => {
      return (
        <img
          onLoad={onLoad}
          src={img.default}
          alt='k'
          style={{ width: "100%", margin: "0.5rem 0", ...style }}
        />
      )
    }
    return alone ? (
      <IMG />
    ) : (
      <Row center='xs'>
        <Col xs={10} sm={8} md={6} lg={6}>
          <IMG />
        </Col>
      </Row>
    )
  }
  return <div />
}

export default getSVG

import React, { useEffect } from "react"
import "./CancellationRefund.css"
import Space from "../Space"
import { Col, Grid, Row } from "./../Grid"
import Footer from "../Footer"
import { AppName } from "../../Config"

export const isMobile = window.innerWidth < 768

function CancellationRefund() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Grid className='cancellation-refund-container'>
      <h1
        className='cancellation-refund-header'
        style={{ marginTop: isMobile ? "40px" : "" }}
      >
        {AppName} Cancellation and Refund Policy
      </h1>
      <Space lg />
      <Row>
        <Col
          md={8}
          xs={12}
          mdOffset={2}
          className='cancellation-refund-content'
        >
          <h2>Cancellation Policy</h2>
          <p>Please add cancellation policy</p>
          <Space lg={5} />
        </Col>
      </Row>
      <Footer />
    </Grid>
  )
}

export default CancellationRefund

import React from "react"
import "./AboutUs.css"
import { Col, Grid, Row } from "./../Grid"
import Space from "../Space"
import getSVG from "../../images/svgs/svg"
import Footer from "../Footer"

function AboutUs() {
  return (
    <Grid className='about-us-container'>
      <Space lg />
      <Row>
        <Col md={4} xs={12}>
          {getSVG("about_us", null, null, true)}
        </Col>
      </Row>
      <Footer />
    </Grid>
  )
}

export default AboutUs

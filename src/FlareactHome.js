import React from "react"
import { Col, Grid, Row } from "./components/Grid"
import Header from "./components/Header"
import Space from "./components/Space"
import Button from "./components/Button"
export default function FlareactHome() {
  return (
    <div>
      <Grid>
        <Row center='xs' middle='xs'>
          <Col xs={12}>
            <Space lg />
            <Space lg />
            <Space lg />
            <Header accent center xxxl>
              Flareact
            </Header>
            <Header center xl bold>
              React & Firebase starter kit for rapid application development
            </Header>
            <Space lg />
            <Space lg />
            <Button colored round>
              Get Started
            </Button>
            <Button accent round>
              Features
            </Button>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { Col, Grid, Row } from "./components/Grid"
import Header from "./components/Header"
import Space from "./components/Space"
import Button from "./components/Button"
import Card from "./components/Card"
import getSVG from "./images/svgs/svg"
import Dialog from "./components/Dialog"
export default function FlareactHome() {
  const [dialogOpen, setDialogOpen] = useState()
  useEffect(() => {}, [])
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
            <Header center md bold>
              React & Firebase starter kit for rapid application development
            </Header>
            <Space lg />
            <Button colored round>
              Get Started
            </Button>
            <Button accent round>
              Features
            </Button>
            <Space lg />
            <Space lg />
            <Space lg />
          </Col>
        </Row>
        <Row middle='xs'>
          <Col xs={12}>
            <Header center bold lg>
              Features
            </Header>
            <Space lg />
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("components", {}, null, true)}>
              <Header accent md bold>
                UI components
              </Header>
              <p>
                Various React UI components included (Button, Card, Jumbotron,
                Expander etc)
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("list", {}, null, true)}>
              <Header accent md bold>
                Firebase components
              </Header>
              <p>
                Render Firestore collection and documents easily in React with
                Firebase Components
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("infinite", {}, null, true)}>
              <Header accent md bold>
                Infinite scroll
              </Header>
              <p>
                CollectionRenderer Firebase component has in-built infinite
                scroll for smooth UX.
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("email", {}, null, true)}>
              <Header accent md bold>
                Notifcation & Email
              </Header>
              <p>
                Configured for sending emails with Email JS, and notify users
                with push-notifications.
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("theme", {}, null, true)}>
              <Header accent md bold>
                Theming
              </Header>
              <p>
                CSS variables are used for easy customization of app and styles.
                All sizes are based on root element's size i.e. rem.
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("darkmode", {}, null, true)}>
              <Header accent md bold>
                Dark Mode
              </Header>
              <p>
                Dark mode is implemented, theme of dark mode can be configured
                using dark-theme specific css variables.
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("nav", {}, null, true)}>
              <Header accent md bold>
                Navigation
              </Header>
              <p>
                Navigation implemented with react-router implemented to that you
                can extend and easily add more pages.
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("terms", {}, null, true)}>
              <Header accent md bold>
                Secondary pages
              </Header>
              <p>
                Pages like policies, terms of use and about us are provided
                without content. You just need to add content
              </p>
              <Space lg />
              <Button small accent round>
                Learn More
              </Button>
            </Card>
          </Col>
        </Row>
        <Dialog open={dialogOpen}></Dialog>
      </Grid>
    </div>
  )
}

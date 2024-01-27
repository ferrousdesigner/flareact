import React, { useEffect, useState } from "react"
import { Col, Grid, Row } from "./components/Grid"
import Header from "./components/Header"
import Space from "./components/Space"
import Button from "./components/Button"
import Card from "./components/Card"
import getSVG from "./images/svgs/svg"
import Dialog, { DialogHeader } from "./components/Dialog"
import Expander from "./components/v2/Expander/Expander"
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
              <Header md bold>
                UI components
              </Header>
              <p>
                Various React UI components included (Button, Card, Jumbotron,
                Expander etc)
              </p>
              <Space lg />
              <Button
                small
                accent
                round
                onClick={() => setDialogOpen("ui-components")}
              >
                Learn More
              </Button>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card svgIcon={getSVG("list", {}, null, true)}>
              <Header md bold>
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
              <Header md bold>
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
              <Header md bold>
                Notifcation & email
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
              <Header md bold>
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
              <Header md bold>
                Dark mode
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
              <Header md bold>
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
              <Header md bold>
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
        <Dialog
          closeOnOverlay
          open={dialogOpen}
          onClose={() => setDialogOpen()}
        >
          {dialogOpen === "ui-components" && (
            <>
              <DialogHeader>
                <Header lg bold>
                  UI Components
                </Header>
                <Header>
                  List of UI components included in this starter kit
                </Header>
              </DialogHeader>
              <Space lg />
              <Expander title='Ad Banners'></Expander>
              <Expander title='Bottom Menu'></Expander>
              <Expander title='Grid'></Expander>
              <Expander title='Row'></Expander>
              <Expander title='Col'></Expander>
              <Expander title='Highlight'></Expander>
              <Expander title='Icon Menu'></Expander>
              <Expander title='Jumbotron'></Expander>
              <Expander title='Nav'></Expander>
              <Expander title='Icon Menu'></Expander>
            </>
          )}
        </Dialog>
      </Grid>
    </div>
  )
}

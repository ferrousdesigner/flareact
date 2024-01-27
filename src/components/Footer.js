import React from "react"
import { Col, Grid, Row } from "./Grid"
import { Link } from "react-router-dom"
import logo from "../images/Icon.png"
import "../styles/footer.css"
import PWAinstall from "./PWA/PWAinstall"
import Header from "./Header"
import Space from "./Space"

export const CompactFooter = ({ color }) => {
  return (
    <div className='compact-footer'>
      <div style={{ marginBottom: "-4px", marginRight: "1rem" }}></div>
      <div className='chrome'>
        This portfolio was created on Foleoz.{" "}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://foleoz.com'
          style={{ color: color }}
        >
          Learn More
        </a>
      </div>
    </div>
  )
}
export const SocialLinks = () => {
  return (
    <div>
      <Header xs>Follow us on.</Header>
      <div className='social-links'>
        <Link to=''>
          <span className='fab fa-instagram' />
        </Link>
        <Link to=''>
          <span className='fab fa-youtube' />
        </Link>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <Grid>
      <Row center='xs' style={{ textAlign: "left" }}>
        <Col xs={12} md={12}>
          <div className='footer smooth'>
            <Row center='xs' middle='xs'>
              <Col xs={12} sm={4} className='footer-col'>
                <Space lg />
                <Link to='/' onClick={() => window.scrollTo(0, 0)}>
                  <img
                    alt=''
                    width={window.innerWidth < 766 ? 100 : 140}
                    src={logo}
                  />
                </Link>
                <Space lg />
                {/* <SocialLinks /> */}
              </Col>
              <Col
                xs={12}
                sm={4}
                style={{ textAlign: "start" }}
                className='footer-col links'
              >
                <Link to='/contact_us'>Contact Us</Link>
                <Link to='/about_us'>About Us</Link>
                <Link to='/policies'>Policies</Link>
                <Link to='/terms'>Terms</Link>
                <Link to='/cancellation-refund'>Cancellation & Refund</Link>
                <Link to='/shipping-delivery'>Shipping & Delivery</Link>

                {/* {mailingList && (
                <div>
                  <Header sm bold>
                    Subscribe.
                  </Header>
                  <Space />
                  {renderMailingList(this.props)}
                </div>
              )} */}
                {/* <div>
                <p>
                  Made with{" "}
                  <span className="fas fa-heart" style={{ color: Colors }} /> by{" "}
                  <a href="https://github.com/ferrousdesigner">
                    @ferrousdesigner
                  </a>
                </p>
              </div> */}
              </Col>
              <Col xs={12} sm={4}>
                <PWAinstall type='footer' />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

export default Footer

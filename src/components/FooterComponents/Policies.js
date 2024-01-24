import React, { useEffect } from "react"
import "./Policies.css"
import { Col, Grid, Row } from "./../Grid"
import Space from "../Space"
import Footer from "../Footer"
import { AppName, supportEmail } from "../../Config"

export const isMobile = window.innerWidth < 768

function Policies() {
  function sendEmailToGmail() {
    let to = supportEmail
    let subject = "Questions or concerns about your Privacy Policy"
    let body = "How can we help you?"

    let mailtoLink = "mailto:" + to + "?subject=" + subject + "&body=" + body

    window.location.href =
      "https://mail.google.com/mail/?extsrc=mailto&url=" +
      encodeURIComponent(mailtoLink)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Grid className='policies-container'>
      <h1
        className='policies-header'
        style={{ marginTop: isMobile ? "40px" : "" }}
      >
        {AppName} Privacy Policy
      </h1>
      <Space lg />
      <Row>
        <Col md={8} xs={12} mdOffset={2} className='policies-content'>
          <h2>1. Introduction</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>1.1 Purpose</h3>
            <Space />
            <p>
              This Privacy Policy outlines how {AppName} collects, uses,
              discloses, and protects your personal information when you use our
              application. It also describes your rights and choices regarding
              your personal data.
            </p>
            <Space lg={5} />
            <h3>1.2 Scope</h3>
            <Space />
            <p>
              This policy applies to all users of the {AppName} application.
            </p>
          </div>
          <Space lg={5} />
          <h2>2. Information We Collect</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>2.1 Personal Information</h3>
            <Space />
            <p>
              <ul>
                <li>Name</li>
                <li>Contact Information (Email, Phone Number)</li>
                <li>Address</li>
                <li>Payment Information</li>
              </ul>
            </p>
            <Space lg={5} />
            <h3>2.2 Non-Personal Information</h3>
            <Space />
            <p>
              <ul>
                <li>Device Information</li>
                <li>Usage Data</li>
                <li>Cookies and Similar Technologies</li>
              </ul>
            </p>
          </div>
          <Space lg={5} />
          <h2>3. How We Use Your Information</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>3.1 Transaction Processing</h3>
            <Space />
            <p>
              We use your personal information to process transactions and
              provide you with the products and services you request.
            </p>
            <Space lg={5} />
            <h3>3.2 Account Management</h3>
            <Space />
            <p>
              To manage your account, provide customer support, and communicate
              with you about our services.
            </p>
            <Space lg={5} />
            <h3>3.3 Marketing and Promotions</h3>
            <Space />
            <p>
              To send you promotional materials and keep you updated about our
              products, services, and special offers.
            </p>
            <Space lg={5} />
            <h3>3.4 Legal Compliance</h3>
            <Space />
            <p>To comply with legal obligations and regulations.</p>
          </div>
          <Space lg={5} />
          <h2>4. Information Sharing</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>We may share your information with:</p>
            <p>
              <ul>
                <li>Service Providers</li>
                <li>Business Partners</li>
                <li>Legal Authorities</li>
              </ul>
            </p>
          </div>
          <Space lg={5} />
          <h2>5. Your Rights and Choices</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>5.1 Access and Correction</h3>
            <Space />
            <p>
              You have the right to access and correct your personal
              information.
            </p>
            <Space lg={5} />
            <h3>5.2 Opt-Out</h3>
            <Space />
            <p>You can opt-out of receiving marketing communications.</p>
            <Space lg={5} />
            <h3>5.3 Data Deletion</h3>
            <Space />
            <p>You can request the deletion of your personal data.</p>
          </div>
          <Space lg={5} />
          <h2>6. Security</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access or disclosure.
            </p>
          </div>
          <Space lg={5} />
          <h2>7. Changes to this Privacy Policy</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices. We will notify you of any significant changes.
            </p>
          </div>
          <Space lg={5} />
          <h2>8. Contact Us</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at -
              <p
                onClick={sendEmailToGmail}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {supportEmail}
              </p>
            </p>
          </div>
          <Space lg={5} />
          <h2>9. Governing Law</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>This Privacy Policy is governed by the laws of India.</p>
          </div>
          <Space lg={5} />
          <h2>Conclusion</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <p>
              Ensure that your privacy policy is drafted in accordance with the
              specific guidelines provided by the Reserve Bank of India and any
              other relevant regulations. Additionally, consider seeking legal
              advice to make sure your privacy policy is comprehensive and
              compliant with applicable laws.
            </p>
          </div>
        </Col>
      </Row>
      <Footer />
    </Grid>
  )
}

export default Policies

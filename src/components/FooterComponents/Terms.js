import React, { useEffect } from "react"
import "./Terms.css"
import Space from "../Space"
import { Col, Grid, Row } from "./../Grid"
import { Link } from "react-router-dom/cjs/react-router-dom"
import Footer from "../Footer"
import { AppName } from "../../Config"

export const isMobile = window.innerWidth < 768

function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Grid className='terms-container'>
      <h1
        className='terms-header'
        style={{ marginTop: isMobile ? "40px" : "" }}
      >
        ${AppName} Terms and Conditions{" "}
      </h1>
      <Space lg />
      <Row>
        <Col md={8} xs={12} mdOffset={2} className='terms-content'>
          <h2>1. Acceptance of Terms</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>1.1</h3>
            <Space />
            <p>
              By accessing or using the ${AppName} application (the "App"), you
              agree to comply with and be bound by these terms and conditions.
            </p>
            <Space />
            <h3>1.2</h3>
            <Space />
            <p>
              If you do not agree with any part of these terms, you must not use
              the App.
            </p>
          </div>
          <Space lg={5} />
          <h2>2. Registration and User Accounts</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>2.1</h3>
            <Space />
            <p>
              To use certain features of the App, you may be required to create
              a user account. You agree to provide accurate, current, and
              complete information during the registration process.
            </p>
            <Space />
            <h3>2.2</h3>
            <Space />
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password. You agree to notify us immediately of any
              unauthorized use of your account.
            </p>
          </div>
          <Space lg={5} />
          <h2>3. Products and Orders</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>3.1</h3>
            <Space />
            <p>
              ${AppName} may offer a variety of products for purchase. Prices,
              descriptions, and availability are subject to change without
              notice.
            </p>
            <Space />
            <h3>3.2</h3>
            <Space />
            <p>
              By placing an order through the App, you agree to pay the
              specified price for the product, including any applicable taxes
              and shipping fees.
            </p>
            <Space />
            <h3>3.3</h3>
            <Space />
            <p>
              ${AppName} reserves the right to refuse or cancel orders at any
              time for any reason, including but not limited to product
              availability, errors in product information, or suspected fraud.
            </p>
          </div>
          <Space lg={5} />
          <h2>4. Payments and Billing</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>4.1</h3>
            <Space />
            <p>
              All payments made through the App are processed securely. $
              {AppName}
              may use third-party payment processors and is not responsible for
              any issues related to their services.
            </p>
            <Space />
            <h3>4.2</h3>
            <Space />
            <p>
              By providing payment information, you represent and warrant that
              you have the legal right to use the payment method.
            </p>
          </div>
          <Space lg={5} />
          <h2>5. Intellectual Property</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>5.1</h3>
            <Space />
            <p>
              The content on the App, including text, graphics, logos, and
              images, is the property of ${AppName} and is protected by
              intellectual property laws.
            </p>
            <Space />
            <h3>5.2</h3>
            <Space />
            <p>
              You may not reproduce, distribute, modify, or display any content
              from the App without the express written consent of ${AppName}.
            </p>
          </div>
          <Space lg={5} />
          <h2>6. User Conduct</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>6.1</h3>
            <Space />
            <p>
              You agree not to engage in any conduct that may disrupt or
              interfere with the operation of the App or the rights of other
              users.
            </p>
            <Space />
            <h3>6.2</h3>
            <Space />
            <p>
              Prohibited activities include but are not limited to hacking,
              unauthorized access, and the distribution of malware.
            </p>
          </div>
          <Space lg={5} />
          <h2>7. Privacy Policy</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>7.1</h3>
            <Space />
            <p>
              Your use of the App is also governed by our Privacy Policy, which
              can be found{" "}
              <Link to='/policies' style={{ color: "blue" }}>
                here
              </Link>
            </p>
          </div>
          <Space lg={5} />
          <h2>8. Termination</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>8.1</h3>
            <Space />
            <p>
              ${AppName} reserves the right to terminate or suspend your account
              and access to the App for any reason, including violation of these
              terms.
            </p>
          </div>
          <Space lg={5} />
          <h2>9. Changes to Terms</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>9.1</h3>
            <Space />
            <p>
              ${AppName} reserves the right to modify these terms and conditions
              at any time. Changes will be effective immediately upon posting.
            </p>
          </div>
          <Space lg={5} />
          <h2>10. Governing Law</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>10.1</h3>
            <Space />
            <p>
              These terms are governed by and construed in accordance with the
              laws of 'IT Act, 2000'.
            </p>
          </div>
          <Space lg={5} />
          <h2>Contact Information:</h2>
          <Space lg={5} />
          <div style={{ marginLeft: "10px" }}>
            <h3>${AppName} Inc.</h3>
            <p>support@${AppName}.life</p>
          </div>
        </Col>
      </Row>
      <Footer />
    </Grid>
  )
}

export default Terms

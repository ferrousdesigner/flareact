import React from "react"
import { Col, Grid, Row } from "./components/Grid"
import { currencyformatter, parseDateTime } from "./GeneralFunctions"
import { AdBar, AdSmall, AdBig } from "./components/AdBanners/AdBanners"
import Loader from "./components/Loader"
import Space from "./components/Space"

function DisplayComponents(props) {
  return (
    <Grid>
      <AdBig
        title='Payment Due'
        desc={`Hi, Seller, glad to see that your store is running well. But now since your sales has reached our threshold. Please pay a nominal fee $XXX to continue running your business smoothly.`}
        action={{ label: "Pay", onClick: () => alert("Clicked") }}
        details={[
          { title: "Due Date", subtitle: parseDateTime(new Date()) },
          { title: "Amount", subtitle: currencyformatter(40000, true) },
        ]}
        detailInfo='Learn more about how we calculated this tax'
      />
      <AdSmall
        title='Payment Due'
        desc={`Hi, Seller, glad to see that your store is running well. But now since your sales has reached our threshold. Please pay a nominal fee $XXX to continue running your business smoothly.`}
        action={{ label: "Pay", onClick: () => alert("Clicked") }}
        details={[
          { title: "Due Date", subtitle: parseDateTime(new Date()) },
          { title: "Amount", subtitle: currencyformatter(40000, true) },
        ]}
        detailInfo='Learn more about how we calculated this tax'
      />
      <AdBar
        title='Payment Due'
        desc={`Hi, Seller, glad to see that your store is running well. But now since your sales has reached our threshold. Please pay a nominal fee $XXX to continue running your business smoothly.`}
        action={{ label: "Pay", onClick: () => alert("Clicked") }}
        details={[
          { title: "Due Date", subtitle: parseDateTime(new Date()) },
          { title: "Amount", subtitle: currencyformatter(40000, true) },
        ]}
        detailInfo='Learn more about how we calculated this tax'
      />
      <Row>
        <Loader type='product' />
      </Row>
      <Space />
      {/* <Row>
        <Loader type='product-full' />
      </Row> */}
      <Row>
        <Col sm={12}>
          <Loader type='contactUs' />
        </Col>
      </Row>
    </Grid>
  )
}

export default DisplayComponents

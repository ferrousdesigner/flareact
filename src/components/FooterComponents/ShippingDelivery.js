import React, { useEffect } from "react"
import "./ShippingDelivery.css"
import { Grid } from "./../Grid"
import { AppName, defaultMessageForDeveloper } from "../../Config"

export const isMobile = window.innerWidth < 768

function ShippingDelivery() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Grid className='shipping-delivery-container'>
      <h1
        className='shipping-delivery-header'
        style={{ marginTop: isMobile ? "40px" : "" }}
      >
        {AppName} Shipping and Delivery Policy
      </h1>
      {defaultMessageForDeveloper}
    </Grid>
  )
}

export default ShippingDelivery

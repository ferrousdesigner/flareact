import Header from "../Header"
import React from "react"
import "./AdBanners.css"
import Space from "../Space"
import { Col, Row } from "./../Grid"
import Button from "../Button"

export const AdBig = ({
  title,
  subTitle,
  desc,
  action,
  details,
  detailsArray,
  detailInfo,
}) => {
  return (
    <div className='ad-banner ad-banner-big'>
      <Row>
        <Col xs={12} md={8}>
          <Header lg bold>
            {title || "Please provide a title"}
          </Header>
          <Space />
          {subTitle && <Header sm>{subTitle}</Header>}
          {desc ? <p>{desc}</p> : ""}
          <Space md />
          {action ? (
            <Button noMar colored onClick={action?.onClick}>
              {action?.label || "Pay"}
            </Button>
          ) : (
            ""
          )}
        </Col>
        <Col xs={12} md={4}>
          <div className='ad-banner-big-red-box'>
            <span className='icon fas fa-info-circle' />
            {details &&
              details?.map((d, k) => (
                <div>
                  <span>{d?.title}</span>
                  <span>{d?.subtitle}</span>
                </div>
              ))}
            {detailsArray &&
              detailsArray?.map((d, k) => (
                <div>
                  <span>{d?.storeName}</span>
                  <span>{d?.amount}</span>
                  {/* <span>{new Date(d?.dueDate)}</span> */}
                </div>
              ))}
            {detailInfo && <div>{detailInfo}</div>}
          </div>
        </Col>
      </Row>
    </div>
  )
}
export const AdBar = ({ title, action, details, detailInfo }) => {
  return (
    <div className='ad-banner ad-banner-bar'>
      <Header lg bold>
        {title || "Please provide a title"}
      </Header>
      <div className='ad-banner-big-red-box'>
        <span className='icon fas fa-info-circle' />
        {details?.map((d, k) => (
          <div>
            <span>{d?.title}</span>
            <span>{d?.subtitle}</span>
          </div>
        ))}
      </div>
      {action ? (
        <Button noMar onClick={action?.onClick}>
          {action?.label || "Pay"}
        </Button>
      ) : (
        ""
      )}
    </div>
  )
}

export const AdSmall = ({ title, action, details, detailInfo }) => {
  return (
    <div className='ad-banner ad-banner-small'>
      <Row>
        <Col xs={12} md={12}>
          <Header lg bold>
            {title || "Please provide a title"}
          </Header>
        </Col>
        <Col xs={12} md={12}>
          <div className='ad-banner-big-red-box'>
            <span className='icon fas fa-info-circle' />
            {details?.map((d, k) => (
              <div>
                <span>{d?.title}</span>
                <span>{d?.subtitle}</span>
              </div>
            ))}
            {detailInfo && <div>{detailInfo}</div>}
          </div>
          <Space md />
          {action ? (
            <Button noMar onClick={action?.onClick}>
              {action?.label || "Pay"}
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  )
}

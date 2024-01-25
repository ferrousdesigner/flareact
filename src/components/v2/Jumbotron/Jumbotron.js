import React from "react"
import "./Jumbotron.css"
import Button from "../../Button"
import Space from "../../Space"
import { Col, Grid, Row } from "./../../Grid"
import {
  capitalizeFirstLetter,
  isMobile,
  truncate,
} from "../../../GeneralFunctions"
import getSVG from "../../../images/svgs/svg"
import EmblemW from "../../../images/EmblemW.png"
import EmblemB from "../../../images/EmblemB.png"
import { RWebShare } from "react-web-share"

export const Emblem = ({ relative, alt }) => {
  let emblemImg =
    localStorage.getItem("theme") === "dark"
      ? alt
        ? EmblemB
        : EmblemW
      : alt
      ? EmblemW
      : EmblemB
  return (
    <span className='flareact-emblem'>
      <img
        src={emblemImg}
        style={
          relative
            ? {
                position: "relative",
                left: 0,
                top: 0,
                right: "unset",
                transform: "none",
              }
            : {}
        }
        alt=''
      />
    </span>
  )
}

export const SharebuttonLink = ({ shareLink }) => {
  const { name, link } = shareLink || {}
  return (
    <span className='flareact-jumbotron-share'>
      <RWebShare
        data={{
          url: link,
          title: `Checkout ${name} on flareact`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <span className='fas fa-share-alt' />
      </RWebShare>
    </span>
  )
}
export const Logo = ({ logo, store, style, parentStyle }) => {
  const logoStyle = {
    width: store ? 200 : 90,
    height: store ? "100px" : "4rem",
    objectFit: "contain",
    ...style,
  }
  return (
    <div className='jumbotron-logo' style={parentStyle}>
      <img alt='' style={logoStyle} src={logo} />
    </div>
  )
}
export const Title = ({ title, style }) => {
  return (
    <div className='jumbotron-title'>
      <h1 style={style}>{title}</h1>
    </div>
  )
}
export const Greeting = ({ greeting, style, shouldTruncate }) => {
  return (
    <div className='jumbotron-greeting'>
      <h1 style={style}>
        {truncate(capitalizeFirstLetter(greeting), shouldTruncate ? 36 : 100)}
      </h1>
    </div>
  )
}
export const SubTitle = ({ subTitle, style }) => {
  return (
    <div className='jumbotron-subtitle'>
      <h3 style={style}>{subTitle}</h3>
    </div>
  )
}

export const Image = ({ img, right }) => {
  return (
    <Col xs={12} md={3} className='banner-image-container'>
      {img ? (
        <img
          style={
            right
              ? {
                  objectFit: "cover",
                  left: 0,
                  transform: "translateX(50%) translateY(-50%) rotate(40deg)",
                }
              : { objectFit: "cover" }
          }
          src={img}
          alt=''
        />
      ) : null}
    </Col>
  )
}
export default function Jumbotron({ config }) {
  const Actions = ({ actions, points, version }) => {
    // console.log("version", version);
    return (
      <div
        className={
          ["store", "default"].includes(version)
            ? "jumbotron-action-container default"
            : "jumbotron-action-container"
        }
      >
        <div className='jumbotron-action'>
          {actions?.map((a, k) => (
            <Button
              white={k > 0}
              accent={a.accent}
              key={k}
              disabled={a.disabled}
              onClick={a.onClick}
              active={a.active}
              small={a.small}
            >
              {a.icon}{" "}
              {(actions?.length < 3 && window.innerWidth < 766) ||
              window.innerWidth > 766 ? (
                a.label
              ) : (
                <span className={a.mobileIcon} />
              )}
            </Button>
          ))}
          {points && (
            <div className='points'>
              {points?.map((p, k) => (
                <span className='point'>{p}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
  const {
    version,
    logo,
    title,
    subtitle,
    actions,
    backgroundImage,
    points,
    category,
    desc,
    style,
    styleOuter,
    logoStyle,
    shareLink,
    backgroundImageRight,
  } = config || {}
  return (
    <div className='jumbotron-container' style={style}>
      {(!version || version === "default") && (
        <div
          style={{
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className='jumbotron-outer' style={styleOuter}>
            <div className='jumbotron-image' />
            <div className='jumbotron-inner'>
              <Grid>
                <Row middle='xs' center='lg' end='xs'>
                  <Image img={backgroundImage} />
                  <Col
                    xs={12}
                    md={6}
                    style={{ paddingTop: isMobile ? "10rem" : "" }}
                  >
                    {logo && <Logo style={logoStyle} logo={logo} />}
                    {title && <Title title={title} />}
                    {subtitle && <SubTitle subTitle={subtitle} />}
                    {isMobile ? <Space md /> : ""}
                    <Actions actions={actions} version={"default"} />
                  </Col>
                  {!isMobile ? <Image right img={backgroundImageRight} /> : ""}
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      )}
      {version === "store" && (
        <div className={"jumbotron-outer jumbotron-store"}>
          {isMobile ? (
            <div className='jumbotron-inner' style={{ padding: 0 }}>
              <Emblem />
              <Row>
                <Col xs={12}>
                  <img
                    src={backgroundImage}
                    style={{
                      width: "100%",
                      height: isMobile ? "45vh" : "60rem",
                      objectFit: "cover",
                      marginBottom: "2rem",
                      borderRadius: 0,
                      transition: "all 0.5s ease",
                    }}
                    alt='jumbotron-inner-background'
                  />
                </Col>
                <Col
                  xs={12}
                  style={{ textAlign: "left", padding: "2rem 5rem 5rem" }}
                >
                  {logo && <Logo logo={logo} />}
                  {title && <Title title={title} />}
                  {subtitle && <SubTitle subTitle={subtitle} />}
                  <p>{desc}</p>
                  {desc && <Space />}
                  <Actions actions={actions} />
                  <SharebuttonLink shareLink={shareLink} />
                </Col>
              </Row>
            </div>
          ) : (
            <div className='jumbotron-inner'>
              <Row middle='xs'>
                <Col xs={8} sm={8} md={7} lg={9} style={{ textAlign: "left" }}>
                  {logo && <Logo logo={logo} />}
                  {title && <Title title={title} />}
                  {subtitle && <SubTitle subTitle={subtitle} />}
                  <p>{desc}</p>
                  {desc && <Space />}
                  <Actions actions={actions} />
                </Col>
                <Col
                  xs={4}
                  sm={4}
                  md={5}
                  lg={3}
                  style={{ position: "relative" }}
                >
                  <img
                    src={backgroundImage}
                    className='jumbotron-inner-background'
                    style={{ width: "100%" }}
                    alt='jumbotron-inner-background'
                  />
                </Col>
              </Row>
            </div>
          )}
        </div>
      )}
      {version === "store-new" && (
        <div className={"jumbotron-outer jumbotron-store jumbotron-store-new"}>
          <div className='jumbotron-store-new-background'>
            <img
              src={backgroundImage}
              className='jumbotron-inner-background'
              style={{ width: "100%" }}
              alt='jumbotron-inner-background'
            />
          </div>
          <div className='jumbotron-inner'>
            <Row middle='xs'>
              <Col xs={12} style={{ textAlign: "left" }}>
                {logo && <Logo logo={logo} />}
                {title && <Title title={title} />}
                {subtitle && <SubTitle subTitle={subtitle} />}
                <p>{desc}</p>
                {desc && <Space />}
                <Actions actions={actions} />
              </Col>
            </Row>
          </div>
        </div>
      )}
      {version === "category" && (
        <div className='jumbotron-outer jumbotron-category'>
          <div
            className='jumbotron-image'
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className='jumbotron-inner'>
            {logo && <Logo logo={logo} />}
            {title && <Title title={title} />}
            {subtitle && <SubTitle subTitle={subtitle} />}
            <Actions actions={actions} points={points} />{" "}
          </div>
        </div>
      )}
      {version === "subcategory" && (
        <div className='jumbotron-outer jumbotron-category'>
          <div
            className='jumbotron-image'
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className='jumbotron-inner'>
            <Logo logo={logo} category={category} />
            <Title title={title} />
            <SubTitle subTitle={subtitle} />
            <Actions actions={actions} points={points} />{" "}
          </div>
        </div>
      )}
    </div>
  )
}

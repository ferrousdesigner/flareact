import React, { Component, Fragment, useEffect, useState } from "react"
import ReactTooltip from "react-tooltip"
import "../styles/card.css"
import { Col, Row } from "./Grid"
import Space from "./Space"
import Icon from "./Icon"
import Header from "./Header"
import { isMobile } from "../GeneralFunctions"
class Card extends Component {
  state = {
    expanded: false,
  }
  componentDidMount() {
    ReactTooltip.rebuild()
  }
  toggle = () => {
    this.setState({
      expanded: !this.state.expanded,
    })
  }
  render() {
    const {
      children,
      style,
      innerStyle,
      className,
      noPadTop,
      colored,
      tip,
      fullHeight,
      iconClass,
      iconLetter,
      fullWidthChild,
      type,
      noShadow,
      circles,
      danger,
      busy,
      notFull,
      themeColor,
      cardActions,
      expanderContent,
      media,
      tag,
      rightComponent,
      svgIcon,
      asLink,
      alt,
      lowPadTop,
      horizontal,
      noHorPad,
      extraPad,
      rowStyle,
    } = this.props
    const { imgUrl, website, videoUrl } = media || {}
    const { expanded } = this.state
    return (
      <div
        className={
          "card " +
          (className ? className : "") +
          (colored ? " colored" : "") +
          (alt ? " alt" : "") +
          (type ? ` ${type}` : "") +
          (busy ? " card-busy" : "") +
          (asLink ? " card-link" : "")
        }
        style={{
          paddingTop: lowPadTop ? "1rem" : noPadTop ? "0rem" : "2rem",
          height: fullHeight ? "100%" : notFull ? "unset" : "",
          ...style,
        }}
        data-tip={tip}
      >
        <Row
          middle={"xs"}
          style={{
            margin: 0,
            padding: extraPad
              ? "5rem 5rem 5rem 5rem"
              : horizontal
              ? "3rem 2rem"
              : "",
            ...rowStyle,
          }}
        >
          <Col
            xs={12}
            sm={svgIcon ? 8 : 12}
            style={{ margin: 0, padding: horizontal || noHorPad ? "0rem" : "" }}
          >
            <div
              style={{
                ...innerStyle,
                boxShadow: noShadow ? "none" : "",
                height: fullHeight ? "100%" : notFull ? "unset" : "",
                padding: horizontal ? "0" : "",
              }}
              className='card-child'
            >
              {tag && <div className='tag'>{tag}</div>}
              {rightComponent && (
                <div className='right-component'>{rightComponent}</div>
              )}

              {imgUrl && (
                <div
                  className={"background"}
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                  }}
                />
              )}
              {videoUrl && (
                <embed
                  className={"background"}
                  src={videoUrl + "?autoplay=1"}
                  wmode='transparent'
                  type='video/mp4'
                  width='100%'
                  autostart={"true"}
                  title='Keyboard Cat'
                />
              )}
              {website || imgUrl || videoUrl
                ? ""
                : circles && (
                    <span
                      className='card-circle-one'
                      style={{ backgroundColor: themeColor }}
                    />
                  )}
              {expanderContent && (
                <button
                  onClick={this.toggle}
                  className={
                    expanded
                      ? "btn-chevron fas fa-chevron-up"
                      : "btn-chevron fas fa-chevron-down"
                  }
                />
              )}
              {website || imgUrl || videoUrl
                ? ""
                : circles && (
                    <span
                      className='card-circle-two'
                      style={{ backgroundColor: themeColor }}
                    />
                  )}
              {iconClass ? (
                <span
                  className={
                    (danger ? "danger " : "") + "card-icon " + iconClass
                  }
                />
              ) : null}
              {iconLetter ? (
                <span className={(danger ? "danger " : "") + "card-icon"}>
                  {iconLetter}
                </span>
              ) : null}
              <div
                className='card-children'
                style={{
                  width: iconClass ? "65%" : fullWidthChild ? "100%" : "",
                  display: horizontal ? "inline-flex" : "",
                }}
              >
                {iconClass ? (
                  <span className={"card-icon-big " + iconClass} />
                ) : null}

                {children}
                {cardActions && (
                  <div className='card-actions'>
                    <div>
                      {cardActions}
                      {expanderContent && expanded ? (
                        <div
                          style={{
                            marginTop: "2rem",
                          }}
                        >
                          {expanderContent}
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={svgIcon ? 4 : 12}>
            {svgIcon && <div className='svg-icon'>{svgIcon}</div>}
          </Col>
        </Row>
      </div>
    )
  }
}

export default Card

export const CardActions = ({ children }) => (
  <div className='card-actions'>
    <div>{children}</div>
  </div>
)

export const StatusCard = ({ title, desc, iconClass, actions }) => {
  return (
    <Card>
      <Space md />

      <Row start='xs' middle='xs' style={{ margin: 0 }}>
        <Col xs={12} md={1} style={{ textAlign: isMobile ? "left" : "center" }}>
          <Icon
            size='8rem'
            inline
            iconClass={iconClass || "lnr lnr-checkmark-circle"}
          />
          {isMobile ? <Space lg /> : ""}
        </Col>
        <Col xs={11} md={10}>
          <Header lg>{title ? title : `Title`}</Header>
          <p>{desc}</p>
          <Space />
          <Space />
          {actions}
        </Col>
      </Row>
      <Space md />
    </Card>
  )
}
export const UserCard = ({
  name,
  desc,
  img,
  actions,
  reviewCard,
  imgCol,
  small,
}) => {
  return (
    <Fragment>
      <Card horizontal>
        <Space md />
        <Row
          start='xs'
          middle={reviewCard ? undefined : "xs"}
          top={!reviewCard ? undefined : "xs"}
          style={{ margin: 0, width: "100%" }}
        >
          <Col
            xs={12}
            md={imgCol || 3}
            style={{
              textAlign: isMobile ? "left" : "center",
              padding: isMobile ? "" : 0,
              paddingTop: "1rem",
            }}
          >
            {!img ? (
              <Icon
                size={small ? "2.5rem" : "4rem"}
                inline
                iconClass={"far fa-user-circle"}
              />
            ) : (
              <img alt='alt-img' src={img} className='card-user-dp' />
            )}
          </Col>
          <Col xs={11} md={8}>
            {isMobile ? <Space lg /> : ""}
            {name && <Header lg={!reviewCard}>{name ? name : `Name`}</Header>}
            <p>{desc}</p>
            {actions && <Space />}
            {actions && <Space />}
            {actions}
          </Col>
        </Row>
        <Space md />
      </Card>
      <Space md />
    </Fragment>
  )
}

export const ExpandableCard = ({ title, children, onExpand }) => {
  const [expanded, setExpandable] = useState(false)
  useEffect(() => {
    if (expanded && onExpand) onExpand()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])
  return (
    <Card noPad noHorPad notFull>
      <div className={"expandable-header " + (onExpand ? "onExpand" : "")}>
        {title}{" "}
        <button onClick={() => setExpandable(!expanded)}>
          {!onExpand && (
            <Fragment>
              {expanded ? (
                <span className='fas fa-chevron-up' />
              ) : (
                <span className='fas fa-chevron-down' />
              )}
            </Fragment>
          )}

          {onExpand ? "View" : ""}
        </button>
      </div>
      {expanded ? <div>{children}</div> : ""}
    </Card>
  )
}

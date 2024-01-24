import React, { Fragment, useState } from "react"
import { Col, Row } from "../../Grid"
import { CurrencySign, defaultImage } from "../../../Config"
import { currencyformatter, isMobile } from "../../../GeneralFunctions"
import Button from "../../Button"
import Dialog from "../../Dialog"
import Header from "../../Header"
import Loader from "../../Loader"
import Rater from "../../Rating/Rater"
import Space from "../../Space"
import {
  Greeting,
  Logo,
  SharebuttonLink,
  SubTitle,
  Title,
} from "../Jumbotron/Jumbotron"

import Flex from "../../Flex"
import "./CompactCard.css"
import Icon from "../../Icon"

export const Rating = ({ rating, handleRating, ...rest }) => {
  return (
    <Rater onClick={handleRating} initialValue={Number(rating)} {...rest} />
  )
}
export const AvailableColors = ({ colors = [], compact, onSelect, value }) => {
  const handleColorClick = selectedColor => {
    const isSelected = value && value.label === selectedColor.label
    onSelect && onSelect(isSelected ? null : selectedColor)
  }
  return (
    <div className={compact ? "available-colors compact" : "available-colors"}>
      {console.log("first color", colors)}
      {colors.map((color, key) => (
        <span
          key={key}
          className={
            "colors " +
            (value && value.label === color.label ? "selected-color" : "")
          }
          style={{
            backgroundColor: color.value,
          }}
          onClick={() =>
            handleColorClick({ label: color.label, value: color.value })
          }
          data-tip={color.label}
        >
          {value && value.label === color.label && (
            <Icon
              iconClass='fa fa-check'
              style={{
                opacity: 0.7,
                color: "var(--green)",
                height: "100%",
                width: "100%",
              }}
            />
          )}
          <span className='shadow' style={{ backgroundColor: color.value }} />
        </span>
      ))}
    </div>
  )
}

const ImageComp = ({ backgroundImage, tag }) => {
  return backgroundImage ? (
    <Col xs={12} md={6}>
      <div
        className='compact-card-image'
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {" "}
        {tag && <div className='cc-tag'>{tag}</div>}
      </div>
    </Col>
  ) : (
    ""
  )
}
export default function CompactCard({ config, notFull }) {
  const [open, setOpen] = useState()
  // const [palette, setPalette] = useState()
  const {
    version,
    logo,
    title = "Title",
    subtitle,
    action,
    point,
    brand,
    name,
    price,
    discount,
    onSave,
    rating,
    primaryAction,
    secAction,
    ownedBy,
    disabled,
    adminActions,
    showAdminActionDialog,
    tag,
    subtitleLabel,
    greeting = "We're " + title,
    isSaved,
    innerStyle,
    totalRatings,
    busy,
    onView,
    hideSaveButton,
    // autoColor = true,
    showReview,
    reviewComponent,
    desc,
    shareLink,
    extraClass,
  } = config || {}
  const backgroundImage = config?.backgroundImage || defaultImage
  // console.log('ceer', version, config?.backgroundImage)
  // useEffect(() => {
  //   // if (backgroundImage && autoColor && version === 'store') {
  //   //   fetch(backgroundImage)
  //   //     .then(response => response.blob())
  //   //     .then(blob => {
  //   //       const sourceImage = new Image()
  //   //       sourceImage.src = URL.createObjectURL(blob)
  //   //       sourceImage.onload = function () {
  //   //         // Create a canvas element
  //   //         let canvas = document.createElement('canvas')
  //   //         let context = canvas.getContext('2d')
  //   //         // Set the canvas dimensions to match the source image
  //   //         canvas.width = sourceImage.width
  //   //         canvas.height = sourceImage.height
  //   //         // Draw the source image onto the canvas
  //   //         context.drawImage(sourceImage, 0, 0)
  //   //         // Convert the canvas content to a data URL (local copy)
  //   //         let copiedImageDataURL = canvas.toDataURL('image/jpeg')
  //   //         // Create a new image element for the local copy
  //   //         let copiedImage = new Image()
  //   //         copiedImage.src = copiedImageDataURL
  //   //         copiedImage.onload = () => {
  //   //           setPalette(getImagePalette(copiedImage))
  //   //         }
  //   //         // Add the local copy to the document or do whatever you need with it
  //   //         // document.body.appendChild(copiedImage);
  //   //       }
  //   //     })
  //   //     .catch(error => {
  //   //       console.error('Error loading image:', error)
  //   //     })
  //   // }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [backgroundImage])
  const sellingPrice = price - (discount / 100) * price
  // console.log('getImagePalette', title, palette)
  return (
    <Fragment>
      {(!version || version === "store") && (
        <div
          className='compact-card-outer cc-store'
          style={{
            height: notFull ? "auto" : "",
            cursor: !adminActions ? "pointer" : "",
          }}
          onClick={!adminActions ? action?.onClick : null}
        >
          {backgroundImage && (
            <div
              className='compact-card-image-blur'
              style={{
                transition: "all 1.2s ease",
                opacity: 0.2,
              }}
            ></div>
          )}
          <div className='compact-card-inner' style={{ ...innerStyle }}>
            <Row middle='xs'>
              {isMobile ? (
                <ImageComp backgroundImage={backgroundImage} tag={tag} />
              ) : (
                ""
              )}
              <Col xs={12} md={6} style={{ padding: isMobile ? "0 5rem" : "" }}>
                {logo && <Logo logo={logo} />}
                {greeting && <Greeting greeting={greeting} />}
                <SubTitle subTitle={subtitle} />
                {!adminActions && action && action?.label && (
                  <div className='store-action'>
                    <Button onClick={action?.onClick} disabled={disabled}>
                      {action?.label}
                    </Button>
                  </div>
                )}
                {!adminActions && (
                  <div className='rating'>
                    <Rating rating={rating || 0} readonly noHead />
                    {totalRatings ? <span>({totalRatings})</span> : ""}
                  </div>
                )}

                {!adminActions && secAction && (
                  <Button onClick={secAction.onClick} white disabled={disabled}>
                    {secAction?.label}
                  </Button>
                )}

                {!adminActions && ownedBy && (
                  <div className='cc-store-meta'>
                    <span>Owned by: {ownedBy}</span>
                  </div>
                )}
              </Col>

              {!isMobile ? (
                <ImageComp backgroundImage={backgroundImage} tag={tag} />
              ) : (
                ""
              )}
            </Row>
            {showReview ? <div>{reviewComponent}</div> : ""}

            {!showAdminActionDialog && adminActions && (
              <div>
                <Space />
                <Space />
              </div>
            )}
            {!showAdminActionDialog ? (
              <div style={{ padding: isMobile ? "0 4rem" : "0 0rem" }}>
                {adminActions}
              </div>
            ) : (
              ""
            )}

            {showAdminActionDialog && (
              <Button onClick={() => setOpen(true)}>More Options</Button>
            )}
          </div>

          <Dialog open={open} onClose={() => setOpen()}>
            <Header md bold>
              Admin Actions
            </Header>
            <Space />
            {adminActions}
          </Dialog>
        </div>
      )}
      {(!version || version === "store-new") && (
        <div
          className={"compact-card-outer cc-store cc-store-new " + extraClass}
          style={{
            height: notFull ? "auto" : "",
            cursor: !adminActions ? "pointer" : "",
          }}
          onClick={!adminActions ? action?.onClick : null}
        >
          {backgroundImage && (
            <img
              alt=''
              className='compact-card-image-blur'
              src={backgroundImage}
            />
          )}
          {backgroundImage && (
            <img
              alt=''
              className='compact-card-image-blur-right'
              src={backgroundImage}
            />
          )}
          {backgroundImage && <div className='compact-card-image-blur-white' />}
          <div
            className='compact-card-inner'
            style={{ ...innerStyle, position: "relative" }}
          >
            <div>
              <span className='cc-store-new-name'>{title}</span>
            </div>
            <div>
              {logo && <Logo logo={logo} />}{" "}
              {subtitle && (
                <Greeting greeting={subtitle} shouldTruncate={false} />
              )}
              <span className='cc-store-desc'>{desc}</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {!adminActions && action && action?.label && (
                <div className='store-action'>
                  <Button onClick={action?.onClick} disabled={disabled}>
                    {action?.label}
                  </Button>
                </div>
              )}

              {!adminActions && secAction && (
                <Button onClick={secAction.onClick} white disabled={disabled}>
                  {secAction?.label}
                </Button>
              )}
              <div>
                {!adminActions && (
                  <div className='rating'>
                    <Rating
                      style={{ fontSize: 18 }}
                      rating={rating || 0}
                      readonly
                      noHead
                    />
                    {totalRatings ? (
                      <span styje={{ fontSize: "2rem" }}>({totalRatings})</span>
                    ) : (
                      ""
                    )}
                  </div>
                )}
                {!adminActions && ownedBy && (
                  <div className='cc-store-meta'>
                    <span>Owned by: {ownedBy}</span>
                  </div>
                )}
              </div>
              {!isMobile
                ? shareLink && <SharebuttonLink shareLink={shareLink} />
                : ""}

              {showReview ? <div>{reviewComponent}</div> : ""}

              {!showAdminActionDialog && adminActions && (
                <div>
                  <Space />
                  <Space />
                </div>
              )}
              {!showAdminActionDialog && adminActions ? (
                <div style={{ padding: isMobile ? "0 4rem" : "0 0rem" }}>
                  {adminActions}
                </div>
              ) : (
                ""
              )}

              {showAdminActionDialog && (
                <Button onClick={() => setOpen(true)}>More Options</Button>
              )}
            </div>
          </div>
          {isMobile
            ? shareLink && <SharebuttonLink shareLink={shareLink} />
            : ""}

          <Dialog open={open} onClose={() => setOpen()}>
            <Header md bold>
              Admin Actions
            </Header>
            <Space />
            {adminActions}
          </Dialog>
        </div>
      )}
      {version === "category-new" && (
        <div
          className='compact-card-outer cc-category-new'
          style={{
            height: notFull ? "auto" : null,
            cursor: action?.onClick ? "pointer" : "",
          }}
          onClick={action?.onClick}
        >
          <div className='compact-card-inner'>
            <div className='cc-img-parent'>
              {backgroundImage && (
                <div
                  className='compact-card-image'
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              )}
            </div>
            {title && <Title title={title} />}
          </div>
        </div>
      )}
      {version === "category-small" && (
        <div
          className='compact-card-outer cc-category-small'
          style={{
            height: notFull ? "auto" : "",
            cursor: action?.onClick ? "pointer" : "",
          }}
          onClick={action?.onClick}
        >
          <div className='compact-card-inner'>
            {backgroundImage && <img src={backgroundImage} alt='ing' />}
            {title && <Title title={title} />}
          </div>
        </div>
      )}
      {version === "category" && (
        <div
          className='compact-card-outer cc-category'
          style={{ height: notFull ? "auto" : "" }}
        >
          <div className='compact-card-inner'>
            <div className='cc-img-parent'>
              {backgroundImage && (
                <div
                  className='compact-card-image'
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              )}
            </div>
            {title && <Title title={title} />}
            <Space />
            <Space />
            {action && (
              <Button
                fullWidth
                onClick={action?.onClick}
                disabled={disabled}
                round
              >
                {action?.icon || action?.label}
              </Button>
            )}
            <Space />
            <Space />
            {secAction && (
              <Button
                fullWidth
                white
                onClick={secAction.onClick}
                disabled={secAction.disabled}
                round
              >
                {secAction?.icon || secAction?.label}
              </Button>
            )}
          </div>
        </div>
      )}
      {version === "product" && (
        <div
          className='compact-card-outer cc-category cc-product'
          style={{ height: notFull ? "auto" : "" }}
        >
          <div className='compact-card-inner'>
            <div
              style={{
                textAlign: "center",
                padding: isMobile ? "2rem" : "1rem",
                paddingTop: "2rem",
                height: isMobile ? "18.5rem" : "17rem",
              }}
            >
              <h3 className='brand'>{brand}</h3>
              <h3 className='name'>{name}</h3>
            </div>

            <div
              className='cc-img-parent'
              style={{ cursor: "pointer", height: isMobile ? "auto" : "30rem" }}
              onClick={onView}
            >
              {backgroundImage && (
                <img
                  crossOrigin='anonymous'
                  // onLoad={() => removeBack()}
                  alt={name}
                  className='compact-card-image'
                  src={backgroundImage}
                />
              )}
              <canvas id='canvas' className='canvas' />
            </div>
            <div
              style={{
                padding: isMobile ? "0px 3rem 1.5rem" : "0px 2rem 0.5rem",
              }}
            >
              <h3 className='price'>
                <span className='currency-sign'>{CurrencySign}</span>
                {currencyformatter(sellingPrice)}{" "}
                <span className='discount-sign'>-{discount}%</span>
              </h3>

              {price && (
                <p className='mrp'>
                  MRP:{" "}
                  <span className='mrp crossed'>
                    {CurrencySign}
                    {currencyformatter(price)}
                  </span>
                </p>
              )}

              <span className='points'>{point}</span>
              <Space lg />
              <div className='actions'>
                {secAction && (
                  <button
                    className='primary'
                    onClick={secAction?.disabled ? null : secAction?.onClick}
                    type='button'
                  >
                    {secAction?.icon} {secAction.label}
                  </button>
                )}
                {primaryAction && (
                  <button
                    onClick={
                      primaryAction.disabled ? null : primaryAction?.onClick
                    }
                    type='button'
                  >
                    More Details
                  </button>
                )}
                {adminActions}
              </div>
              <Flex auto>
                <div className='rating'>
                  <Rating rating={rating || 0} readonly noHead />
                  {totalRatings ? <span>({totalRatings})</span> : ""}
                </div>
                <div>
                  {busy && (
                    <span
                      style={{
                        float: "right",
                        fontSize: "1rem",
                      }}
                    >
                      <Loader sm />
                    </span>
                  )}
                  {!busy && !hideSaveButton && (
                    <span
                      className={isSaved ? "fas fa-heart" : "far fa-heart"}
                      style={{
                        float: "right",
                        fontSize: "2.5rem",
                        color: isSaved
                          ? "var(--red)"
                          : "var(--main-font-color)",
                      }}
                      onClick={onSave}
                    />
                  )}
                </div>
              </Flex>
            </div>
          </div>
          {showReview ? <div>{reviewComponent}</div> : ""}
        </div>
      )}
      {version === "query" && (
        <div
          className='compact-card-outer cc-store cc-query'
          style={{
            height: notFull ? "auto" : "",
            cursor: !adminActions ? "pointer" : "",
          }}
          onClick={!adminActions ? action?.onClick : null}
        >
          <div
            className='compact-card-inner'
            style={{ width: "100%", margin: "1rem" }}
          >
            <Row top='xs'>
              <Col md={12}>
                {title && <Title title={title} />}
                {subtitle && (
                  <>
                    <Header xs>{subtitleLabel || ""}</Header>
                    <SubTitle subTitle={subtitle} />
                  </>
                )}
                {action && (
                  <div className='store-action'>
                    <Button onClick={action?.onClick} disabled={disabled}>
                      {action?.label}
                    </Button>
                  </div>
                )}

                {secAction && (
                  <Button onClick={secAction.onClick} white disabled={disabled}>
                    {secAction?.label}
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Fragment>
  )
}

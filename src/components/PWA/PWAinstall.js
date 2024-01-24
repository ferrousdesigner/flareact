import React, { Fragment, useState } from "react"
import { Row, Col } from "./../Grid"
import "./pwa.css"
import logo from "./../../images/Icon.png"
import { useStateValue } from "../../StateProvider"
import PWAInstallerPrompt from "./PWAInstallerPrompt"
import { PWAInstallMsg } from "../../Config"

export default function PWAinstall({ type }) {
  const [{ hidePWAWarning }, dispatch] = useStateValue()
  const [hidden, setHide] = useState()
  const isFooterHidden = hidePWAWarning && hidePWAWarning.footer
  const isDrawerHidden = hidePWAWarning && hidePWAWarning.drawer
  const isMobileHidden = hidePWAWarning && hidePWAWarning.mobile
  const hide = t => {
    let payLoad = {}
    payLoad[t] = true
    dispatch({
      type: "UPDATE_PWA_PROMPTS",
      hidePWAWarning: payLoad,
    })
  }
  if (window.matchMedia("(display-mode: standalone)").matches && !hidden) {
    setHide(true)
  }

  if (window.ReactNativeWebView || process.env.REACT_APP_ENABLE_PWA !== "Yes") {
    return <div />
  }
  const handleChange = () => {}
  return hidden ? (
    <Fragment />
  ) : type === "footer" ? (
    <div
      className={
        isFooterHidden
          ? "pwa-installer-footer pwa-footer-hidden"
          : "pwa-installer-footer"
      }
    >
      <Row center='xs'>
        <Col xs={12}>
          <div className='card-v2'>
            <Row>
              <Col xs={2}>
                <img alt='logo' src={logo} width={"100%"} />
              </Col>
              <Col xs={10} style={{ textAlign: "right" }}>
                <h1>{PWAInstallMsg}</h1>
                <button className='text-btn' onClick={() => hide("footer")}>
                  Not Now
                </button>
                <PWAInstallerPrompt
                  render={({ onClick }) => (
                    <button className='pwa-install-btn' onClick={onClick}>
                      Install
                    </button>
                  )}
                  callback={handleChange}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  ) : type === "drawer" ? (
    <div
      className={
        isDrawerHidden
          ? "pwa-installer-footer pwa-drawer pwa-drawer-hidden"
          : "pwa-installer-footer pwa-drawer"
      }
    >
      <Row center='xs'>
        <Col xs={12}>
          <div className='card-v2'>
            <Row>
              <Col xs={3}>
                <img alt='logo' src={logo} width={"100%"} />
              </Col>
              <Col xs={9} style={{ textAlign: "right" }}>
                <h1>{PWAInstallMsg}</h1>
                <button className='text-btn' onClick={() => hide("drawer")}>
                  Not Now
                </button>
                <PWAInstallerPrompt
                  render={({ onClick }) => (
                    <button className='pwa-install-btn' onClick={onClick}>
                      Install
                    </button>
                  )}
                  callback={handleChange}
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  ) : type === "mobile" ? (
    <div
      className={
        isMobileHidden
          ? "pwa-installer-footer pwa-mobile pwa-mobile-hidden"
          : "pwa-installer-footer pwa-mobile"
      }
    >
      <Row center='xs'>
        <Col xs={12}>
          <div className='card-v2'>
            <Row>
              <Col xs={2}>
                <img alt='logo' src={logo} width={"100%"} />
              </Col>
              <Col xs={10} style={{ textAlign: "right" }}>
                <div className='pwa-content'>
                  <p>{PWAInstallMsg}</p>
                  <button className='text-btn' onClick={() => hide("mobile")}>
                    Not Now
                  </button>
                  <PWAInstallerPrompt
                    render={({ onClick }) => (
                      <button className='pwa-install-btn' onClick={onClick}>
                        Install
                      </button>
                    )}
                    callback={handleChange}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <Fragment />
  )
}

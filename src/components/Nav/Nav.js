/* eslint-disable jsx-a11y/anchor-is-valid */
import moment from "moment"
import React, { Fragment, useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { canShowMenu, isDev, isMobile } from "../../GeneralFunctions"
import { useStateValue } from "../../StateProvider"
import DevPanel from "../DevPanel"
import PWAinstall from "../PWA/PWAinstall"
import { auth } from "../../firebaseSetting"
import logo from "../../images/Icon.png"
import "../../styles/theme.css"
import "./Nav.css"
import NavItem from "./NavItem"
import NavItemContainer from "./NavItemContainer"
const SquareIcon = logo

const toggleTheme = () =>
  localStorage.getItem("theme") === "dark" ? "light" : "dark"

function Nav() {
  const [{ currentStore, user, userMeta, shouldSearchOpen }, dispatch] =
    useStateValue()
  const [themeIcon, setIcon] = useState(
    localStorage.getItem("theme") === "dark" ? "fas fa-moon" : "fas fa-sun",
  )
  const history = useHistory()
  const [transform, setTransform] = useState("transformX(0)")
  const [logoBarTransform, setLogoBarTransform] = useState(
    "translateY(-100%) translateX(-50%)",
  )

  const [isSearchOpen, setIsOpen] = useState()
  const [menuOpen, setMenuOpen] = useState()
  const isLarge = window.innerWidth > 766
  let canBack = window.location.pathname !== "/"
  const viewAccount = (user, history) => {
    if (user) {
      history.push("/account")
    } else {
      history.push({
        pathname: "/login",
        state: {
          goBack: "account",
        },
      })
    }
  }
  let lastScrollTop = 0

  const handleScroll = () => {
    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > lastScrollTop) {
      // User is scrolling down
      setTransform(isMobile ? "translateY(100px)" : "translateY(0)")

      // console.log("Scrolling down");
    } else if (scrollTop < lastScrollTop) {
      // User is scrolling up
      setTransform("translateY(0)")
      // console.log("Scrolling up");
    }
    let jumbotronContainer = document.querySelector(".jumbotron-container")

    // Check if the element is found
    // Get the actual height of the element
    var actualHeight = jumbotronContainer?.clientHeight - 100 || 400
    if (scrollTop > actualHeight) {
      setLogoBarTransform("translateY(0) translateX(-50%)")
    } else {
      setLogoBarTransform("translateY(-100px) translateX(-50%)")
    }

    // Update the last scroll position
    lastScrollTop = scrollTop
  }
  const attachScroll = () => window.addEventListener("scroll", handleScroll)

  const removeScroll = () => window.removeEventListener("scroll", handleScroll)

  useEffect(() => {
    themeSetter(localStorage.getItem("theme"))
    attachScroll()
    return removeScroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // computeAlertTop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transform])

  useEffect(() => {
    setIsOpen(shouldSearchOpen)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldSearchOpen])

  const themeSetter = theme => {
    if (theme === "light") {
      setIcon("fas fa-moon")
      let body = document.getElementsByClassName("default")[0]
      body.classList.remove("theme-dark")
      body.classList.add("theme-light")
      localStorage.setItem("theme", "light")
    } else {
      setIcon("fas fa-sun")
      let body = document.getElementsByClassName("default")[0]
      body.classList.remove("theme-light")
      body.classList.add("theme-dark")
      localStorage.setItem("theme", "dark")
    }
  }

  const handleAuthentication = () => {
    setMenuOpen()
    if (user) {
      auth.signOut()
      dispatch({
        type: "SHOW_ALERT",
        open: true,
        message: "Log Out Successfully",
      })
      history.push("/")
    }
  }
  const { store_logo, store_name } = currentStore || {}
  // console.log('currentStore', currentStore)
  const backButton =
    !isLarge && !isSearchOpen && canBack
      ? [
          {
            iconClass: "fas fa-arrow-left",
            onClick: () => history.goBack(),
            highlighted: true,
          },
        ]
      : []
  if (window.location.pathname === "/login") {
    return <div></div>
  } else {
    return (
      <Fragment>
        {!isLarge && canBack && (
          <div
            className='floating-logo'
            style={{
              transform: logoBarTransform,
              opacity:
                logoBarTransform === "translateY(-100%) translateX(-50%)"
                  ? 0
                  : 1,
              transition: "1s ease",
            }}
          >
            {currentStore ? (
              <span
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to='/' style={{ marginLeft: 0 }}>
                  <img
                    className='header__logo'
                    src={store_logo}
                    style={{ filter: "none" }}
                    alt='ss'
                  />
                </Link>
                <span
                  style={{
                    marginLeft: "2rem",
                    fontSize: "2.6rem",
                    fontWeight: "bold",
                    color: "var(--white)",
                  }}
                >
                  {store_name}
                </span>
              </span>
            ) : (
              ""
            )}
            <Link to='/' style={{ marginLeft: 0 }}>
              <img
                className='header__logo'
                height={"25rem"}
                src={SquareIcon}
                style={{ filter: "none" }}
                alt='ss'
              />
            </Link>
          </div>
        )}
        <div
          className='nav-header'
          style={{
            paddingBottom: isMobile ? "4rem" : "",
          }}
        >
          {isLarge && (
            <div className='flex'>
              <Link to='/' style={{ marginLeft: 0 }}>
                <img className='header__logo' src={logo} alt='ss' />
              </Link>
            </div>
          )}
          {!isLarge && !isSearchOpen && false && (
            <div
              className={"nav-back-button"}
              style={{
                transform: canBack
                  ? "translateX(0) translateY(-120%)"
                  : "translateX(-200%) translateY(-120%)",
              }}
            >
              <div
                className={canBack ? "icon-flex appear" : "icon-flex disappear"}
              >
                <a onClick={() => history.goBack()}>
                  <span className='fas fa-arrow-left'></span>
                </a>
              </div>
            </div>
          )}
          {(isLarge || isSearchOpen) && canShowMenu() && (
            <div className='flex mobile-btw header__search-container'>
              {isSearchOpen && (
                <span
                  style={{
                    display: "inline-flex",
                    width: "8rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className='fas fa-times'
                  onClick={() => {
                    setIsOpen(false)
                    if (isMobile) {
                      dispatch({
                        type: "GENERAL",
                        data: {
                          shouldSearchOpen: false,
                        },
                      })
                    }
                  }}
                />
              )}
            </div>
          )}
          {!isSearchOpen && canShowMenu() && (
            <div className='header__nav'>
              <NavItemContainer>
                {[
                  ...backButton,
                  {
                    label: "Home",
                    iconClass: "fas fa-home",
                    to: "/",
                    activeOn: window.location.pathname === "/",
                  },
                  {
                    label: "More",
                    iconClass: "fas fa-bars",
                    onClick: () => setMenuOpen(true),
                    activeOn: isSearchOpen,
                  },
                ].map((l, i) => (
                  <NavItem key={i} {...l} />
                ))}
              </NavItemContainer>
            </div>
          )}
        </div>
        <div
          id='nav_drawer'
          onBlur={event => event.target.id !== "nav_drawer" && setMenuOpen()}
          className={menuOpen ? "nav-menu-pane menu-open" : "nav-menu-pane"}
        >
          <div className='icon-flex'>
            <Link
              to='/'
              style={{ marginLeft: 0, backgroundColor: "transparent" }}
            >
              <img className='header__logo' alt='logo' src={logo} />
            </Link>
            <a
              href='#'
              rel='noopener noreferrer'
              className='search-toggle'
              onClick={() => setMenuOpen()}
            >
              <span className='fas fa-times'></span>
            </a>
          </div>
          <div className='nmp-links'>
            <Link
              to='#'
              onClick={() => {
                themeSetter(toggleTheme())
              }}
            >
              <span className=''>
                <span
                  style={{ marginRight: "1.6rem" }}
                  className={themeIcon}
                ></span>{" "}
                {`${
                  localStorage.getItem("theme") === "dark" ? "Light" : "Dark"
                } Mode`}
              </span>
            </Link>
            <Link to={!user ? "/login" : "#"} onClick={handleAuthentication}>
              <span
                style={{ marginRight: "1.6rem" }}
                className={user ? "fa fa-sign-out" : "fa fa-sign-in"}
              >
                {" "}
              </span>
              {user ? "Logout" : "Login"}
            </Link>
          </div>
          {isDev ? <DevPanel /> : ""}
          <div style={{ textAlign: "center" }}>
            <p>
              <b>Version</b> <br /> {process.env.REACT_APP_VERSION}
            </p>
            <p>
              <b>Last updated at</b> <br />
              {moment(process.env.REACT_APP_UPDATED_AT).format(
                "DD-MMM-YYYY (HH:MM:SS)",
              )}
            </p>
          </div>
          <PWAinstall type='drawer' />
        </div>
      </Fragment>
    )
  }
}

export default Nav

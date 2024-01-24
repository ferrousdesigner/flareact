import React, { Component } from "react"
import "../styles/floating_bar.css"
import Portal from "./Portal"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { toggleFab } from "../actions/themeActions"
import { isMobile } from "ismobilejs"

class FloatingBar extends Component {
  state = {
    oldScrollPos: window.scrollY,
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scroll)
  }
  scroll = () => {
    const { oldScrollPos } = this.state
    const { theme = {} } = this.props
    const { fabHidden } = theme
    if (isMobile().apple.phone) return this.props.toggleFab(true)
    if (oldScrollPos <= window.scrollY) {
      if (!fabHidden && !this.smoother) {
        this.smoother = true
        this.props.toggleFab()
      }
    } else {
      if (fabHidden && !this.smoother) {
        this.smoother = true
        this.props.toggleFab(true)
      }
    }
    this.setState(
      {
        oldScrollPos: window.scrollY,
      },
      () => setTimeout(() => (this.smoother = false), 1000),
    )
  }
  render() {
    const { buttons, theme = {} } = this.props
    const { fabHidden } = theme
    const path = true

    return (
      <div>
        <Portal open={this.props.auth.user} simple>
          <div
            className={
              (fabHidden ? "fab-container fab-hidden" : "fab-container") +
              (path ? " " : " auto-show")
            }
          >
            {buttons &&
              buttons.map(({ to, onClick, disabled, label, primary }, k) => {
                return !to ? (
                  <button
                    key={k}
                    onClick={onClick}
                    disabled={disabled}
                    className={
                      "no-select fab-button" + (primary ? " primary" : "")
                    }
                  >
                    {label}
                  </button>
                ) : (
                  <span key={k}>
                    <Link
                      to={to}
                      key={k}
                      onClick={onClick ? onClick : () => {}}
                      disabled={disabled}
                      className={
                        " no-select fab-button" + (primary ? " primary" : "")
                      }
                    >
                      {label}
                    </Link>
                  </span>
                )
              })}
          </div>
        </Portal>
      </div>
    )
  }
}

export default connect(
  state => ({ ...state }),
  d => ({
    toggleFab: a => d(toggleFab(a)),
  }),
)(FloatingBar)

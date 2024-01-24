import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "../styles/portal.css";
const isMobile = () => window.innerWidth < 500;
export default class Portal extends Component {
  state = {
    open: false,
    animateClass: "hidden",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.open && !state.open) {
      return {
        animateClass: "zoom-in",
        open: true,
      };
    } else if (!props.open && state.open) {
      return {
        animateClass: "zoom-out",
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    // if (prevProps.open && !this.props.open) {
    //   setTimeout(() => {
    //     this.setState({
    //       open: false
    //     });
    //   }, 400);
    //   document
    //     .getElementsByClassName("main-content")[0]
    //     .classList.remove("overflow-hidden");
    // } else if (!prevProps.open && this.props.open) {
    //   document
    //     .getElementsByClassName("main-content")[0]
    //     .classList.add("overflow-hidden");
    // }
  }
  render() {
    const { animateClass, open } = this.state;
    const { simple, target = document.body, onlyOnPhone, style } = this.props;
    return open ? (
      (onlyOnPhone && isMobile()) || !onlyOnPhone ? (
        ReactDOM.createPortal(
          <div
            className={simple ? "" : "portal-container"}
            style={{ ...style }}
          >
            <div className={simple ? animateClass : "portal " + animateClass}>
              {this.props.children}
            </div>
          </div>,
          target
        )
      ) : (
        <Fragment>{this.props.children}</Fragment>
      )
    ) : (
      <Fragment />
    );
  }
}

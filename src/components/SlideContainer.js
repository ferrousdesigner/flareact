import React, { Component } from "react";
import "../styles/slide_container.css";

class SlideContainer extends Component {
  state = {
    activeClass: "active",
  };
  UNSAFE_componentWillReceiveProps(np) {
    if (np.activeIndex > this.props.activeIndex) {
      this.scrollToTop();
      this.setState({
        activeClass: "active",
      });
    } else if (np.activeIndex < this.props.activeIndex) {
      this.scrollToTop();
      this.setState({
        activeClass: "active-reverse",
      });
    }
  }
  scrollToTop() {
    // setTimeout(() => {
    //   document.querySelector(".fs-dialog")
    //     ? (document.querySelector(".fs-dialog").scrollTop = 0)
    //     : "";
    // }, 200);
  }
  render() {
    const { children, activeIndex, padded } = this.props;
    return (
      <div className={"slide-container " + padded ? 'padded' : ''}>
        {children.length > 0 &&
          children.map((child, k) => {
            return (
              <div
                key={k}
                className={
                  activeIndex === child.props.index
                    ? "slide " + this.state.activeClass
                    : "slide"
                }
              >
                {child}
              </div>
            );
          })}
      </div>
    );
  }
}

export default SlideContainer;

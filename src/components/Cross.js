import React, { Component } from "react";
import "../styles/cross.css";
const isMobile = () => window.innerWidth < 500;

let isPhone = isMobile();

export default class Cross extends Component {
  render() {
    const { toggle = () => {} } = this.props;
    return (
      <button
        onClick={toggle}
        className={"app-cross"}
        style={{ position: isPhone ? "fixed" : "" }}
      >
        <span className="fa fa-times" />
      </button>
    );
  }
}

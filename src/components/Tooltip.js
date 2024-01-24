import React, { Component } from "react";

export default class Tooltip extends Component {
  render() {
    return (
      <span
        className="fas fa-info-circle"
        style={{ fontSize: "2rem" }}
        data-tip={this.props.tip}
      />
    );
  }
}

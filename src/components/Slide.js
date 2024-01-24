import React, { Component } from "react";

class Slide extends Component {
  render() {
    return <div key={this.props.key}>{this.props.children}</div>;
  }
}

export default Slide;
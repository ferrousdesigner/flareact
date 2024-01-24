import React, { Component } from "react";

export default class Padding extends Component {
  render() {
    return (
      <div {...this.props} className='normal-pad'>
        {this.props.children}
      </div>
    );
  }
}

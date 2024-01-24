import React, { Component } from 'react';
import '../styles/safe-area-bottom.css'

class SafeAreaBottom extends Component {
  render() {
    const { isIphone } = this.props.theme
    return (
      <div style={{display: !isIphone ? 'none' : ''}} className='' />
    );
  }
}

export default SafeAreaBottom;
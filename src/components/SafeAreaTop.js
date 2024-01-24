import React, { Component } from 'react';
import '../styles/safe-area-top.css'

class SafeAreaTop extends Component {
  render() {
    const { isIphone } = this.props.theme
    return (
      <div style={{display: !isIphone ? 'none' : ''}} className='safe-area-top' />
    );
  }
}

export default SafeAreaTop
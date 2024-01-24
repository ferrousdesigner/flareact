import React, { Component } from 'react'
import '../styles/dots.css'

export default class Dots extends Component {
    render() {
        const { quantity, activeIndex} = this.props
        const arr = []
        for(let i = 0; i<quantity; i++){
            arr.push('1')
        };
        return (
          <div className="app-dots">
              {arr.map((i, k) => {
                return (
                  <div
                    key={k}
                    className={
                      activeIndex === k ? "app-dot active" : "app-dot"
                    }
                  ></div>
                );
              })}
          </div>
        );
    }
}

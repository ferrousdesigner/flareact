import React, { Component } from 'react'

export default class Activity extends Component {
    render() {
        return (
          <div>
            <div id="main-activity" className={this.props.relative ? "show relative" : "show"}>
              <div className="loader"></div>
            </div>
          </div>
        );
    }
}

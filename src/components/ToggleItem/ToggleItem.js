import React, { Component } from "react";
import "./ToggleItem.css";

export default class ToggleItem extends Component {
  render() {
    const { on, label, disabled, vert, onClick } = this.props;
    return (
      <div className="toggle-item" onClick={disabled ? () => {} : onClick}>
        {vert && (
          <div className={on ? "on" : "off"}>
            <h3>{label}</h3>
            <span className={on ? "fas fa-toggle-on" : "fas fa-toggle-off"} />
          </div>
        )}
      </div>
    );
  }
}

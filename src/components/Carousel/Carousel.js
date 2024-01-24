import React, { Component } from "react";
import "./Carousel.css";

export default class Carousel extends Component {
  render() {
    const { projects, isProject, large, small } = this.props;
    let finalP = small
      ? projects
      : isProject
        ? projects
        : projects &&
        projects.length > 0 &&
        projects
          .slice(0, 4)
          .map((pOb) => Object.values(pOb)[0])
          .filter((p) => p.imgUrl);
    return (
      <div>
        <div
          style={this.props.style}
          className={
            large && window.innerWidth > 850 ? "carousel large" : "carousel"
          }
        >
          {finalP &&
            finalP.map((p, key) => {
              let url = isProject ? (small ? p.imgUrl : p) : p.imgUrl;
              // console.log(url);
              return (
                <img
                  key={key}
                  className="images"
                  alt={"project"}
                  src={url}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

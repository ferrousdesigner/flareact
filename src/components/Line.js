import React from "react";
const Line = ({ center, thick }) => (
  <div>
    <div
      style={{
        width: "3rem",
        height: thick ? "0.7rem" : "0.5rem",
        borderRadius: "1rem",
        display: "inline-block",
        margin: center ? "3rem auto" : "3rem 0",
        backgroundColor: "var(--theme-color)",
      }}
    />
  </div>
);

export default Line;

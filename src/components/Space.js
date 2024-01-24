import React from "react";
const Space = ({ lg, md, sm, h }) => (
  <div
    style={{
      height: h ? h : sm ? "0.5rem" : lg ? "3rem" : md ? "2rem" : "1rem",
    }}
  />
);
export default Space;

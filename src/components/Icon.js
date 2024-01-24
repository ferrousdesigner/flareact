import React from "react";
import { isMobile } from "../GeneralFunctions";

const Icon = ({
  iconClass,
  src,
  height,
  width,
  center,
  size,
  color,
  round,
  style,
  inline,
  className,
  nativeIcon
}) => nativeIcon
    ?
    <span
      className={nativeIcon} style={!isMobile ? { marginRight: "1rem" } : {}}
    />
    :
    <div
      className={className}
      style={{
        width: round ? "5rem" : width || (inline ? "auto" : "10rem"),
        height: round ? "5rem" : src ? width : height || "auto",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        margin: center ? "0 auto" : "",
        borderRadius: round ? "50%" : 0,
        padding: round && !src && "2rem",
        background: round && "var(--border-color)",
        color: color || "var(--theme-color)",
        overflow: "hidden",
        ...style,
      }}
    >
      {src && (
        <img
          alt="user"
          src={src}
          style={{ borderRadius: "50%" }}
          width={"100%"}
          height={"100%"}
        />
      )}
      {iconClass && (
        <span
          style={{ fontSize: size || "3rem" }}
          className={iconClass || "fas fa-cog"}
        />
      )}
    </div>;

export default Icon;

import React from 'react';

const Flex = ({
  col,
  flexDirection,
  justifyContent,
  alignItems,
  inline,
  children,
  auto,
}) => {
  return (
    <div
      style={{
        width: "100%",
        flexDirection: col ? "column" : flexDirection || "",
        display: inline ? "inline-flex" : "flex",
        justifyContent: justifyContent || "space-between",
        alignItems: alignItems || "center",
        minHeight: auto ? "auto" : "calc(100vh - 16rem)",
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
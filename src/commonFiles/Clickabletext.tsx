import React, { useState } from "react";
import { ClickableProps } from "./commonTypes";

export const ClickableText: React.FC<ClickableProps> = ({
  onClick,
  text,
  style = {},
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      data-testid={id}
      onClick={onClick}
      style={{
        ...style,
        cursor: "pointer",
        textDecoration: "none",
        color: isHovered ? "#e85d04" : "black",
      }}
      // Event handlers for hover
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </span>
  );
};

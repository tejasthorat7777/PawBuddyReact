import { Button } from "@mui/material";
import { useState } from "react";
import { SubmitButtonProps } from "./commonTypes";

export const SendButton: React.FC<SubmitButtonProps> = ({
  operationOnData,
  style = {},
  text,
}) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <Button
      type="submit"
      data-testid="submitBtn"
      variant="contained"
      style={{
        position: "absolute",
        backgroundColor: onHover ? "#597081" : "#00111c",
        fontFamily: "cursive",
        ...style,
      }}
      onClick={operationOnData}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      {text}
    </Button>
  );
};

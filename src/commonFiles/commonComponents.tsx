import { Button } from "@mui/material";
import { useState } from "react";
import { SubmitButtonProps } from "./commonTypes";

export const SendButton: React.FC<SubmitButtonProps> = ({
  operationOnData,
  email = true,
  password = true,
  style = {},
  text,
}) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <Button
      type="submit"
      variant="contained"
      style={{
        position: "absolute",
        backgroundColor: onHover ? "#597081" : "#00111c",
        fontFamily: "cursive",
        ...style,
      }}
      onClick={(event) => {
        if (!email || !password) {
          event.preventDefault();
        } else {
          operationOnData(event);
        }
      }}
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

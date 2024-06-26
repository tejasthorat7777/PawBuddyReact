import { Button } from "@mui/material";
import { useState } from "react";
import { SubmitButtonProps } from "./commonTypes";

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  operationOnData,
  email,
  password,
}) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <Button
      type="submit"
      variant="contained"
      style={{
        position: "absolute",
        bottom: "2%",
        left: "40%",
        backgroundColor: onHover ? "#597081" : "#00111c",
        fontFamily: "cursive",
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
      Submit
    </Button>
  );
};

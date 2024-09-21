import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { flexDiv } from "./commonTheme";
import { useState } from "react";

const Quantity = ({ style = {} }) => {
  const [quantity, setQuantity] = useState(0);

  const addProduct = () => {
    setQuantity(quantity + 1);
  };

  const subtractProduct = () => {
    setQuantity(quantity > 0 ? quantity - 1 : 0);
  };

  return (
    <Box
      style={{
        height: "5%",
        color: "white",
        backgroundColor: "grey",
        ...flexDiv,
        ...style,
        borderRadius: "3%",
      }}
    >
      <IconButton onClick={subtractProduct}>
        <DeleteIcon sx={{ fontSize: 20, color: "white" }} />
      </IconButton>
      <input
        value={quantity}
        type="text"
        onChange={(e) => setQuantity(Number(e.target.value) || 0)}
        style={{
          backgroundColor: "white",
          padding: "4%",
          color: "black",
          textAlign: "center",
        }}
      />

      <IconButton onClick={addProduct}>
        <AddIcon sx={{ fontSize: 20, color: "white" }} />
      </IconButton>
    </Box>
  );
};

export default Quantity;
